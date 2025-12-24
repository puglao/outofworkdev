## Context

The knowledge base application needs persistent data storage to manage users, organizations, and knowledge content. Currently, the application has no database layer or data persistence mechanism. This change introduces the foundational data architecture using Drizzle ORM and PostgreSQL, with users as the first entity to demonstrate the full stack pattern.

**Stakeholders**: Developers, future AI agents consuming the knowledge base
**Constraints**: Single-binary MVP deployment, type-safe database access, automatic schema validation generation

## Goals / Non-Goals

**Goals:**
- Establish type-safe database access layer with Drizzle ORM
- Generate validation schemas automatically from database schemas
- Implement dual-layer validation (API + database)
- Provide local development environment with Docker Compose
- Build reusable patterns for HTMX-driven CRUD UIs
- Enable database migrations and schema versioning

**Non-Goals:**
- Multi-dialect database support (SQLite, MySQL) - PostgreSQL only
- Complex authentication/authorization (users are simple data models)
- Database query optimization or performance tuning
- Production database deployment (handled separately via Pulumi)

## Decisions

### Decision 1: Drizzle ORM with drizzle-typebox

Use Drizzle ORM as the database abstraction layer and drizzle-typebox to generate TypeBox validation schemas.

**Rationale**:
- Drizzle provides excellent TypeScript support with compile-time type safety
- drizzle-typebox automatically generates validation schemas from database schemas, reducing duplication
- Drizzle Kit provides migration tooling compatible with Bun
- PostgreSQL-first design aligns with production requirements (no multi-dialect complexity)

**Example:**
```typescript
// Define schema once
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// Generate TypeBox schemas automatically
const UserSchema = createSelectSchema(usersTable);
const CreateUserSchema = t.Omit(createInsertSchema(usersTable), ['id']);
```

**Alternatives considered:**
- Prisma: Heavier runtime, separate schema language, less flexible for advanced queries
- TypeORM: Decorator-based, doesn't integrate well with TypeBox
- Raw SQL with Postgres.js: No type safety, manual validation schema writing

### Decision 2: Dual-Layer Validation

Implement validation at both the API layer (TypeBox) and database layer (CHECK constraints).

**Rationale**:
- API validation provides immediate feedback with detailed error messages
- Database constraints ensure data integrity even if API validation is bypassed
- Defense in depth prevents invalid data from entering the system
- CHECK constraints enforce business rules at the lowest level

**Example:**
```typescript
// API-level validation
const CreateUserSchema = createInsertSchema(usersTable, {
  name: (schema) => ({ ...schema, minLength: 1, maxLength: 255 }),
  age: (schema) => ({ ...schema, minimum: 1, maximum: 150 }),
  email: (schema) => ({ ...schema, format: 'email' })
});

// Database-level validation
pgTable("users", { /* ... */ }, (table) => ({
  ageCheck: check("age_check", sql`${table.age} >= 1 AND ${table.age} <= 150`),
  nameCheck: check("name_check", sql`length(${table.name}) >= 1`),
  emailCheck: check("email_check", sql`${table.email} ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}'`),
}))
```

**Trade-offs:**
- Slightly more code to maintain both layers
- Database error messages are less user-friendly than API validation errors
- Performance: negligible overhead for CHECK constraints

### Decision 3: Service Layer Pattern

Introduce a service layer (`src/services/`) between routes and database.

**Rationale**:
- Encapsulates database operations with clear interfaces
- Enables reuse across API and HTMX routes
- Makes testing easier (mock service layer instead of database)
- Provides single source of truth for business logic

**Structure:**
```
src/services/user.ts
- createUser(name, age, email) -> User
- getUserById(id) -> User | undefined
- getAllUsers() -> User[]
- updateUser(id, data) -> User
- deleteUser(id) -> void
```

**Alternatives considered:**
- Direct database queries in routes: Less reusable, harder to test
- Repository pattern: Over-engineered for current scope
- Domain models with methods: Adds complexity without clear benefit for simple CRUD

### Decision 4: Docker Compose for Local Development

Provide docker-compose.yml with PostgreSQL 17 and CloudBeaver for local development.

**Rationale**:
- Developers need consistent local environment
- CloudBeaver provides web-based database management UI
- Pre-configured datasource eliminates manual setup
- Aligns with project constraint: "all DevOps operations in this repo"

**Configuration:**
```yaml
services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: knowledge_base
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
  cloudbeaver:
    image: dbeaver/cloudbeaver:latest
    ports:
      - "8978:8978"
    volumes:
      - ./cloudbeaver-datasources.json:/opt/cloudbeaver/workspace/GlobalConfiguration/.dbeaver/data-sources.json
```

**Trade-offs:**
- Developers must run Docker locally
- Adds ~200MB to development setup
- CloudBeaver startup time ~10 seconds

### Decision 5: HTMX CRUD Pattern

Build web UI using HTMX with server-rendered HTML fragments for CRUD operations.

**Rationale**:
- Aligns with existing frontend architecture (HTMX + server-rendered HTML)
- No client-side state management complexity
- Progressive enhancement: works without JavaScript for basic operations
- Icon-only buttons reduce visual clutter while maintaining accessibility (via title attributes)

**Pattern:**
```tsx
// Create: POST returns new item HTML, inserted at top of list
<form hx-post="/users/create" hx-target="#users-grid" hx-swap="afterbegin">

// Update: PATCH returns updated item HTML, replaces existing
<form hx-patch={`/users/${id}`} hx-target={`#user-${id}`} hx-swap="outerHTML">

// Delete: DELETE returns empty, removes item from DOM
<button hx-delete={`/users/${id}`} hx-target={`#user-${id}`} hx-swap="outerHTML">
```

**Alternatives considered:**
- React/Vue SPA: Over-engineered for current needs, requires API-only backend
- Full page refreshes: Poor UX, loses form state
- Inline JavaScript: Harder to maintain, doesn't follow HTMX patterns

### Decision 6: TypeBox Schema Composition

Use TypeBox utility types (t.Omit, t.Partial) to derive schemas from base schemas.

**Rationale**:
- Single source of truth for validation rules
- CreateUserSchema = InsertSchema - id (auto-generated field)
- UpdateUserSchema = Partial(InsertSchema - id) (all fields optional)
- Reduces duplication and maintains consistency

**Example:**
```typescript
const _insertUser = createInsertSchema(usersTable, { /* refinements */ });

// Derived schemas
const CreateUserSchema = t.Omit(_insertUser, ['id']);
const UpdateUserSchema = t.Partial(t.Omit(_insertUser, ['id']));
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Elysia Application                   │
├─────────────────────────────────────────────────────────┤
│  Web Routes (/users)          API Routes (/api/users)   │
│  ├─ GET /users                ├─ GET /api/users         │
│  ├─ POST /users/create        ├─ POST /api/users        │
│  ├─ PATCH /users/:id          ├─ PATCH /api/users/:id   │
│  └─ DELETE /users/:id         └─ DELETE /api/users/:id  │
│         │                              │                 │
│         └──────────┬───────────────────┘                 │
│                    ▼                                     │
│            Service Layer (src/services/user.ts)         │
│                    │                                     │
│                    ▼                                     │
│            Drizzle ORM (src/db/index.ts)                │
│                    │                                     │
│                    ▼                                     │
│              PostgreSQL 17                              │
└─────────────────────────────────────────────────────────┘

Validation Flow:
API Request → TypeBox Validation → Service Layer → Drizzle → DB CHECK Constraints
```

## Data Model

### Users Table Schema

```typescript
{
  id: integer (primary key, auto-increment)
  name: varchar(255) NOT NULL
  age: integer NOT NULL (CHECK: 1-150)
  email: varchar(255) NOT NULL UNIQUE (CHECK: email regex)
}
```

**Constraints:**
- `id`: Auto-generated, never provided by clients
- `name`: Non-empty string, max 255 characters
- `age`: Integer between 1 and 150
- `email`: Valid email format (regex validated), unique across all users

## Migration Strategy

This is a new capability with no existing data.

**Initial Setup:**
1. Developer runs `docker-compose up -d` to start PostgreSQL
2. Application connects to database on startup
3. Run `bun run drizzle-kit push` to create initial schema (development)
4. For production: Generate and apply migrations via Drizzle Kit

**Future Schema Changes:**
1. Update `src/db/schema.ts`
2. Generate migration: `bun run drizzle-kit generate`
3. Review generated SQL
4. Apply migration: `bun run drizzle-kit migrate`

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| TypeBox version conflicts | Pin @sinclair/typebox to 0.34.41 in package.json overrides |
| Database connection failures | Fail fast on startup, log clear error messages |
| Invalid data bypassing API validation | Database CHECK constraints provide fallback validation |
| HTMX swap targeting wrong element | Use unique IDs per entity (e.g., `#user-${id}`) |
| Schema drift between development and production | Use Drizzle migrations for all changes, version control migration files |

## Performance Considerations

- **Database queries**: Simple CRUD operations, no N+1 queries
- **Connection pooling**: Postgres.js handles pooling automatically
- **Index strategy**: Primary key (id) and unique constraint (email) provide indexes
- **Future optimization**: Add indexes on frequently queried fields when needed

## Security Considerations

- **SQL injection**: Drizzle parameterizes all queries automatically
- **Input validation**: Dual-layer validation prevents invalid data
- **Email uniqueness**: Database enforces uniqueness to prevent duplicate accounts
- **Future needs**: Authentication/authorization layer (not in this change)

## Open Questions

None. All design decisions are finalized and implementation is complete.
