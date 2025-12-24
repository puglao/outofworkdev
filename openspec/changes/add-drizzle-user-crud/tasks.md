## 1. Dependencies and Configuration

- [x] 1.1 Add drizzle-orm, drizzle-typebox, postgres to package.json
- [x] 1.2 Add @sinclair/typebox version override to prevent conflicts (0.34.41)
- [x] 1.3 Configure JSX support in tsconfig.json (jsxFactory, jsxFragmentFactory)
- [x] 1.4 Create drizzle.config.ts for migration tooling
- [x] 1.5 Create bunfig.toml for Bun runtime configuration

## 2. Development Environment

- [x] 2.1 Create docker-compose.yml with PostgreSQL 17
- [x] 2.2 Add CloudBeaver service for database management
- [x] 2.3 Configure CloudBeaver datasource for automatic PostgreSQL connection
- [x] 2.4 Document database connection strings

## 3. Database Schema and Connection

- [x] 3.1 Create `src/db/` directory
- [x] 3.2 Define users table schema in `src/db/schema.ts` with pgTable
- [x] 3.3 Add database-level CHECK constraints (age 1-150, name min length, email format)
- [x] 3.4 Create database connection in `src/db/index.ts` using postgres-js driver
- [x] 3.5 Export typed db instance with schema

## 4. Schema Validation Layer

- [x] 4.1 Generate TypeBox schemas from Drizzle using createSelectSchema/createInsertSchema
- [x] 4.2 Add validation refinements (minLength, maxLength, minimum, maximum, email format)
- [x] 4.3 Create derived schemas using t.Omit and t.Partial (CreateUserSchema, UpdateUserSchema)
- [x] 4.4 Export reusable schemas for API endpoints

## 5. Service Layer

- [x] 5.1 Create `src/services/` directory
- [x] 5.2 Implement createUser function in `src/services/user.ts`
- [x] 5.3 Implement getUserById function
- [x] 5.4 Implement getAllUsers function
- [x] 5.5 Implement updateUser function
- [x] 5.6 Implement deleteUser function

## 6. API Endpoints

- [x] 6.1 Create `src/routes/api/users.ts` for user CRUD endpoints
- [x] 6.2 Implement POST /api/users (create user with validation)
- [x] 6.3 Implement GET /api/users (list all users)
- [x] 6.4 Implement GET /api/users/:id (get single user)
- [x] 6.5 Implement PATCH /api/users/:id (update user with partial validation)
- [x] 6.6 Implement DELETE /api/users/:id (delete user)
- [x] 6.7 Add OpenAPI documentation tags and descriptions
- [x] 6.8 Integrate user routes into API module

## 7. Web UI Components

- [x] 7.1 Create `src/views/layout.tsx` with JSX layout component
- [x] 7.2 Add HTMX, Tailwind CSS, and dark mode script to layout
- [x] 7.3 Create `src/routes/web/` directory for web routes
- [x] 7.4 Implement UserCard component with edit/delete actions
- [x] 7.5 Implement UserEditForm component for inline editing
- [x] 7.6 Implement CreateUserForm component
- [x] 7.7 Implement UsersList component with grid layout
- [x] 7.8 Add icon-only action buttons (create, refresh, edit, delete)

## 8. HTMX Integration

- [x] 8.1 Create GET /users route (render full page with user list)
- [x] 8.2 Create GET /users/create route (return create form HTML)
- [x] 8.3 Create POST /users/create route (create user, return UserCard HTML)
- [x] 8.4 Create GET /users/:id/edit route (return edit form HTML)
- [x] 8.5 Create PATCH /users/:id route (update user, return updated UserCard HTML)
- [x] 8.6 Create DELETE /users/:id route (return empty response with 200 status)
- [x] 8.7 Configure HTMX swap strategies (afterbegin, outerHTML, innerHTML)
- [x] 8.8 Add confirmation dialogs for destructive actions

## 9. Route Organization

- [x] 9.1 Update `src/routes/api/index.ts` to include user routes
- [x] 9.2 Create web routes module in `src/routes/web/index.tsx`
- [x] 9.3 Update `src/index.ts` to register web routes before API routes
- [x] 9.4 Ensure route ordering maintains precedence (web, then api)

## 10. Validation

- [x] 10.1 Verify database migrations can be generated with drizzle-kit
- [x] 10.2 Verify API endpoints validate input correctly
- [x] 10.3 Verify database CHECK constraints enforce data integrity
- [x] 10.4 Verify TypeBox schemas prevent invalid data
- [x] 10.5 Verify HTMX interactions update DOM correctly
- [x] 10.6 Verify create/edit/delete operations work end-to-end
- [x] 10.7 Verify dark mode toggle persists preference
- [x] 10.8 Verify OpenAPI documentation includes user endpoints
