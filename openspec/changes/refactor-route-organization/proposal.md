# Change: Refactor Route Organization into Modular Structure

## Why

As the application grows, having all routes defined in a single file (`src/index.ts`) becomes unmaintainable. A modular route structure improves code organization, enables better separation of concerns, and makes it easier to test and scale the codebase.

## What Changes

- Create modular route structure with separate directories for API and HTMX routes
- Move API routes to `src/routes/api/` directory
- Move HTMX UI routes to `src/routes/htmx/` directory
- Add OpenAPI documentation integration for API routes
- Add health check endpoint at `/api/healthz`
- Update main entry point to compose routes from modules

## Impact

- Affected specs: New `backend` capability
- Affected code:
  - `src/index.ts` - Simplified to route composition
  - `src/routes/api/index.ts` - New API route module with OpenAPI
  - `src/routes/api/healthz.ts` - New health check endpoint
  - `src/routes/htmx/index.ts` - New HTMX route module
  - `package.json` - Add `@elysiajs/openapi` dependency
