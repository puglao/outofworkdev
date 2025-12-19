## Context

The application started with all routes in a single `src/index.ts` file. As features grow (API endpoints, HTMX UI routes, future integrations), this pattern becomes difficult to maintain and test.

**Stakeholders**: Developers
**Constraints**: Must maintain single-binary deployment, minimize breaking changes

## Goals / Non-Goals

**Goals:**
- Organize routes by functional domain (API, HTMX UI)
- Enable independent development and testing of route modules
- Add OpenAPI documentation for API routes
- Maintain clear entry point in main file

**Non-Goals:**
- Multiple server processes (stay single binary)
- Complex dependency injection
- Route versioning (future concern)

## Decisions

### Decision 1: Directory Structure by Concern

Organize routes into `src/routes/{concern}/` directories.

**Rationale**: Separates API logic from UI rendering logic. Makes it clear what each module handles. Follows common patterns in web frameworks.

**Structure:**
```
src/routes/
├── api/          # REST API endpoints
│   ├── index.ts  # API module composition
│   └── healthz.ts
└── htmx/         # HTMX UI routes
    └── index.ts  # UI route handlers
```

**Alternatives considered:**
- Flat file structure (`routes/api-health.ts`): Doesn't scale well
- Feature-based (`routes/knowledge-base/`): Premature for MVP

### Decision 2: Elysia Instance Per Module

Each route module exports an Elysia instance with routes attached.

**Rationale**: Elysia's plugin system works by composing instances. Each module can have its own configuration (prefix, plugins, middleware).

**Example:**
```typescript
export const apiRoutes = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(healthzRoute)
```

### Decision 3: OpenAPI Integration for API Routes

Add `@elysiajs/openapi` to API routes only.

**Rationale**: API endpoints need machine-readable documentation for third-party integrations (per project requirements). HTMX routes are for human interaction and don't need OpenAPI.

**Configuration:**
- API routes: `detail: { hide: false }` (visible in OpenAPI)
- HTMX routes: No OpenAPI integration needed
- Exclude non-API routes from OpenAPI with regex filter

### Decision 4: Health Check Endpoint

Add `/api/healthz` endpoint for monitoring.

**Rationale**: Standard pattern for Kubernetes readiness/liveness probes. Returns simple JSON `{ status: "ok" }`.

## Route Composition Pattern

Main entry point composes route modules:

```typescript
import { apiRoutes } from "./routes/api";
import { htmxRoutes } from "./routes/htmx";

const app = new Elysia()
  .use(apiRoutes)      // Mounted at /api/*
  .use(html())
  .use(staticPlugin())
  .use(htmxRoutes)     // Mounted at /*
  .listen(3000);
```

Order matters:
1. API routes first (most specific prefix)
2. Middleware (html, static)
3. HTMX routes last (catch-all for UI)

## Module Independence

Each route module:
- Exports a single Elysia instance
- Can be imported and tested independently
- Has its own prefix/configuration
- Doesn't directly import other route modules

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Route ordering bugs | Document order explicitly in index.ts |
| Import cycle between modules | Enforce one-way dependency (routes don't import routes) |
| Confusion about which file to edit | Clear directory names and README |

## Migration Plan

This change is already implemented. This proposal documents the architecture for future reference.

**No rollback needed** - structure is stable.

## Future Considerations

- Add route module for WebSocket/SSE endpoints
- Add route module for AsyncAPI/NATS event handlers
- Consider automated API documentation generation
- Add integration tests per module

## Open Questions

None.
