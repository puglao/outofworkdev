## ADDED Requirements

### Requirement: Modular Route Organization

The system SHALL organize routes into modular files grouped by functional concern.

#### Scenario: API route module
- **WHEN** developer adds a new API endpoint
- **THEN** endpoint is added to `src/routes/api/` directory
- **AND** endpoint is composed into `apiRoutes` export

#### Scenario: HTMX route module
- **WHEN** developer adds a new UI route
- **THEN** route is added to `src/routes/htmx/` directory
- **AND** route is composed into `htmxRoutes` export

#### Scenario: Route module independence
- **WHEN** route module is imported for testing
- **THEN** module can be tested in isolation
- **AND** module doesn't have circular dependencies with other route modules

### Requirement: OpenAPI Documentation

The system SHALL provide OpenAPI documentation for API endpoints.

#### Scenario: API documentation endpoint
- **WHEN** client requests `/api/openapi`
- **THEN** server returns OpenAPI specification
- **AND** specification includes all API routes under `/api` prefix

#### Scenario: HTMX routes excluded from API docs
- **WHEN** OpenAPI specification is generated
- **THEN** HTMX UI routes are excluded
- **AND** only `/api/*` routes are documented

### Requirement: Health Check Endpoint

The system SHALL provide a health check endpoint for monitoring and orchestration.

#### Scenario: Health check request
- **WHEN** client sends GET request to `/api/healthz`
- **THEN** server returns HTTP 200 status code
- **AND** response body contains `{ "status": "ok" }`

#### Scenario: Health check availability
- **WHEN** server is running
- **THEN** health check endpoint responds within 100ms
- **AND** endpoint doesn't require authentication

### Requirement: Route Composition

The system SHALL compose route modules in a deterministic order in the main entry point.

#### Scenario: Route module loading
- **WHEN** application starts
- **THEN** API routes are registered first (most specific prefix)
- **AND** middleware is registered second
- **AND** HTMX routes are registered last (catch-all)

#### Scenario: Prefix isolation
- **WHEN** API route is registered with `/api` prefix
- **THEN** route only matches requests starting with `/api`
- **AND** HTMX routes don't conflict with API routes
