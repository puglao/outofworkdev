# Change: Add Drizzle ORM Integration and User CRUD Features

## Why

The application needs persistent data storage with type-safe database access and automatic schema validation. Drizzle ORM provides excellent TypeScript integration, migrations support, and can generate validation schemas automatically via drizzle-typebox. A user management system serves as the foundational data model for the knowledge base platform.

## What Changes

- Add Drizzle ORM with PostgreSQL for data persistence
- Integrate drizzle-typebox for automatic TypeBox schema generation from database schemas
- Create user database schema with validation constraints (CHECK constraints)
- Implement CRUD API endpoints for user management with OpenAPI documentation
- Build HTMX-powered web UI for user management (create, read, update, delete)
- Set up Docker Compose for local PostgreSQL development with CloudBeaver admin UI
- Organize database code into `src/db/` directory structure
- Organize service layer into `src/services/` directory structure
- Configure Drizzle Kit for database migrations

## Impact

- Affected specs:
  - New `data-persistence` capability for Drizzle ORM and database management
  - New `api` capability for REST API endpoints
  - Modified `frontend` capability to add user management UI
  - New `development-environment` capability for Docker Compose setup
- Affected code:
  - `package.json` - Add drizzle-orm, drizzle-typebox, postgres, @elysiajs/openapi dependencies
  - `docker-compose.yml` - New PostgreSQL 17 and CloudBeaver setup
  - `drizzle.config.ts` - New Drizzle Kit configuration
  - `src/db/schema.ts` - New user table schema with validation
  - `src/db/index.ts` - New database connection setup
  - `src/services/user.ts` - New user CRUD service layer
  - `src/routes/api/users.ts` - New user API endpoints
  - `src/routes/web/index.tsx` - New user management web UI
  - `src/views/layout.tsx` - Reusable JSX layout component
  - `tsconfig.json` - JSX configuration for HTML generation
