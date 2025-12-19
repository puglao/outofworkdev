## ADDED Requirements

### Requirement: HTMX Frontend Integration

The system SHALL provide an HTMX-powered frontend where the server returns HTML and HTMX handles dynamic DOM updates.

#### Scenario: Page load with HTMX
- **WHEN** user navigates to the application root
- **THEN** server returns full HTML page with HTMX loaded
- **AND** page includes `hx-boost="true"` for enhanced navigation

#### Scenario: Partial content update
- **WHEN** user triggers an HTMX request (e.g., clicks button with `hx-get`)
- **THEN** server returns HTML fragment
- **AND** HTMX swaps fragment into target element

### Requirement: Elysia Static Plugin

The system SHALL use `@elysiajs/static` plugin to serve static assets from the `public/` directory.

#### Scenario: Static file serving
- **WHEN** client requests a file from `/public/*`
- **THEN** Elysia serves the file from the `public/` directory

#### Scenario: HTML routes unaffected
- **WHEN** client requests a page route (e.g., `/`)
- **THEN** request is handled by Elysia route handlers
- **AND** static plugin does not interfere

### Requirement: Elysia HTML Plugin

The system SHALL use `@elysiajs/html` plugin for generating HTML responses.

#### Scenario: HTML response generation
- **WHEN** route handler returns HTML content
- **THEN** response has correct `Content-Type: text/html` header
- **AND** HTML is properly formatted

### Requirement: TailwindCSS Styling

The system SHALL use TailwindCSS v4 via `bun-plugin-tailwind` for styling.

#### Scenario: Tailwind classes applied
- **WHEN** HTML elements include Tailwind utility classes
- **THEN** styles are applied correctly in the browser
