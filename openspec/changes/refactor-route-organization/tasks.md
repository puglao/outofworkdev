## 1. Directory Structure

- [x] 1.1 Create `src/routes/api/` directory for API endpoints
- [x] 1.2 Create `src/routes/htmx/` directory for UI routes
- [x] 1.3 Create `src/routes/api/index.ts` for API route composition
- [x] 1.4 Create `src/routes/htmx/index.ts` for HTMX route composition

## 2. API Route Module

- [x] 2.1 Move API routes from `src/index.ts` to `src/routes/api/`
- [x] 2.2 Add OpenAPI plugin to API route module
- [x] 2.3 Configure API prefix as `/api`
- [x] 2.4 Create health check endpoint in `src/routes/api/healthz.ts`
- [x] 2.5 Export `apiRoutes` Elysia instance

## 3. HTMX Route Module

- [x] 3.1 Move HTMX routes from `src/index.ts` to `src/routes/htmx/index.ts`
- [x] 3.2 Export `htmxRoutes` Elysia instance
- [x] 3.3 Ensure routes use layout for consistent UI

## 4. Main Entry Point

- [x] 4.1 Import route modules in `src/index.ts`
- [x] 4.2 Compose routes in correct order (API, middleware, HTMX)
- [x] 4.3 Remove inline route definitions from main file

## 5. Dependencies

- [x] 5.1 Add `@elysiajs/openapi` to package.json
- [x] 5.2 Update bun.lock

## 6. Validation

- [x] 6.1 Verify `/api/openapi` endpoint returns OpenAPI spec
- [x] 6.2 Verify `/api/healthz` returns health status
- [x] 6.3 Verify HTMX routes still work at root path
- [x] 6.4 Verify no route conflicts or ordering issues
- [x] 6.5 Verify application starts without errors
