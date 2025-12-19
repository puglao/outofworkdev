# frontend Specification

## Purpose
TBD - created by archiving change add-htmx-frontend. Update Purpose after archive.
## Requirements
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

The system SHALL use TailwindCSS v4 via CDN for styling with class-based dark mode support.

#### Scenario: Tailwind classes applied
- **WHEN** HTML elements include Tailwind utility classes
- **THEN** styles are applied correctly in the browser

#### Scenario: Dark mode classes
- **WHEN** HTML elements include dark mode variant classes (e.g., `dark:bg-gray-800`)
- **THEN** dark mode styles are applied when dark theme is active
- **AND** light mode styles are applied when light theme is active

### Requirement: Dark Theme Support

The system SHALL provide a dark theme toggle that persists user preference in localStorage and respects system color scheme preferences.

#### Scenario: Initial theme detection
- **WHEN** user visits the application for the first time
- **THEN** system checks localStorage for saved theme preference
- **AND** if no preference exists, system detects and applies system color scheme preference
- **AND** theme is applied before page render to prevent flash

#### Scenario: Theme toggle activation
- **WHEN** user clicks the theme toggle button
- **THEN** theme switches between light and dark mode
- **AND** preference is saved to localStorage
- **AND** all UI elements transition smoothly to new theme

#### Scenario: Theme persistence
- **WHEN** user returns to the application after setting theme preference
- **THEN** previously selected theme is loaded from localStorage
- **AND** theme is applied immediately on page load

#### Scenario: Dark mode styling
- **WHEN** dark theme is active
- **THEN** all UI components display with appropriate dark mode colors
- **AND** text contrast meets accessibility standards
- **AND** icons and buttons adapt to dark theme

