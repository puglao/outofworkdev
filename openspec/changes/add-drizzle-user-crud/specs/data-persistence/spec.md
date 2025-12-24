## ADDED Requirements

### Requirement: Drizzle ORM Integration

The system SHALL use Drizzle ORM with PostgreSQL driver for type-safe database access.

#### Scenario: Database connection establishment
- **WHEN** application starts
- **THEN** database connection is established using postgres-js driver
- **AND** connection string is read from environment variable or defaults to local PostgreSQL
- **AND** Drizzle instance is initialized with schema

#### Scenario: Type-safe query execution
- **WHEN** code queries the database using Drizzle
- **THEN** TypeScript compiler enforces type safety on query parameters
- **AND** query results are typed according to schema definitions

#### Scenario: Connection failure handling
- **WHEN** database connection cannot be established
- **THEN** application logs clear error message
- **AND** application fails fast rather than running without database

### Requirement: Database Schema Definition

The system SHALL define database schemas using Drizzle's schema builder with PostgreSQL types.

#### Scenario: Users table schema
- **WHEN** users table schema is defined
- **THEN** schema includes id (auto-increment primary key), name, age, and email fields
- **AND** schema enforces NOT NULL constraints on required fields
- **AND** schema enforces UNIQUE constraint on email field
- **AND** schema uses appropriate PostgreSQL types (integer, varchar)

#### Scenario: Schema export for typing
- **WHEN** schema is defined in src/db/schema.ts
- **THEN** schema is exported for use in queries
- **AND** TypeScript can infer types from schema definitions

### Requirement: Database Constraints

The system SHALL enforce data integrity using database-level CHECK constraints.

#### Scenario: Age validation constraint
- **WHEN** user record is inserted or updated
- **THEN** database enforces age is between 1 and 150
- **AND** database rejects records with age outside this range

#### Scenario: Name validation constraint
- **WHEN** user record is inserted or updated
- **THEN** database enforces name has minimum length of 1 character
- **AND** database rejects empty name values

#### Scenario: Email format constraint
- **WHEN** user record is inserted or updated
- **THEN** database validates email matches standard email regex pattern
- **AND** database rejects invalid email formats

#### Scenario: Constraint violation error
- **WHEN** database constraint is violated
- **THEN** database returns clear error message
- **AND** application can identify which constraint failed

### Requirement: TypeBox Schema Generation

The system SHALL generate TypeBox validation schemas automatically from Drizzle schemas using drizzle-typebox.

#### Scenario: Select schema generation
- **WHEN** createSelectSchema is called on a Drizzle table
- **THEN** TypeBox schema is generated matching database schema
- **AND** schema includes all fields with correct types

#### Scenario: Insert schema generation
- **WHEN** createInsertSchema is called on a Drizzle table
- **THEN** TypeBox schema is generated for insert operations
- **AND** schema excludes auto-generated fields (e.g., id)
- **AND** schema includes optional fields as optional

#### Scenario: Schema refinement
- **WHEN** generated schema needs additional validation
- **THEN** refinement callback can add constraints (minLength, maxLength, minimum, maximum, format)
- **AND** refinements are merged with base schema

#### Scenario: Schema composition
- **WHEN** multiple schemas need to be combined
- **THEN** TypeBox utilities (t.Omit, t.Partial, t.Composite) can derive new schemas
- **AND** derived schemas maintain type safety

### Requirement: Migration Management

The system SHALL use Drizzle Kit for database migrations and schema versioning.

#### Scenario: Migration configuration
- **WHEN** drizzle.config.ts exists in project root
- **THEN** configuration specifies dialect (postgresql), schema path, and output directory
- **AND** configuration includes database credentials

#### Scenario: Migration generation
- **WHEN** developer runs drizzle-kit generate
- **THEN** migration files are created in configured output directory
- **AND** migration SQL reflects schema changes

#### Scenario: Migration application
- **WHEN** developer runs drizzle-kit push or migrate
- **THEN** pending migrations are applied to database
- **AND** database schema matches code definitions

### Requirement: Database Organization

The system SHALL organize database code in src/db/ directory with clear separation of concerns.

#### Scenario: Schema file location
- **WHEN** database schemas are defined
- **THEN** schemas are located in src/db/schema.ts
- **AND** schemas are exported for external use

#### Scenario: Database connection file
- **WHEN** database connection is configured
- **THEN** connection code is in src/db/index.ts
- **AND** typed database instance is exported

#### Scenario: Schema imports
- **WHEN** code needs to query database
- **THEN** code imports db instance from src/db/index.ts
- **AND** code imports table definitions from src/db/schema.ts for type safety
