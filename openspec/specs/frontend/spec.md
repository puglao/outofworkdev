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

### Requirement: User Management Web UI

The system SHALL provide an HTMX-powered web interface for managing users with create, read, update, and delete operations.

#### Scenario: User list page load
- **WHEN** user navigates to /users
- **THEN** server returns full HTML page with layout
- **AND** page displays grid of all existing users
- **AND** page includes action buttons for creating users and refreshing list

#### Scenario: User card display
- **WHEN** user is displayed in grid
- **THEN** card shows user name, age, and email
- **AND** card includes edit and delete action buttons
- **AND** card has unique element ID for HTMX targeting

#### Scenario: Create user form display
- **WHEN** user clicks create button
- **THEN** HTMX requests create form via GET /users/create
- **AND** form is inserted into page without full refresh
- **AND** form includes inputs for name, age, and email

#### Scenario: User creation via HTMX
- **WHEN** user submits create form
- **THEN** HTMX sends POST request to /users/create
- **AND** server returns HTML fragment with new user card
- **AND** new user card is inserted at top of grid (afterbegin swap)
- **AND** form is reset and cleared

#### Scenario: Edit user form display
- **WHEN** user clicks edit button on user card
- **THEN** HTMX requests edit form via GET /users/:id/edit
- **AND** form replaces user card in place (innerHTML swap)
- **AND** form is pre-populated with existing user data

#### Scenario: User update via HTMX
- **WHEN** user submits edit form
- **THEN** HTMX sends PATCH request to /users/:id
- **AND** server returns HTML fragment with updated user card
- **AND** updated card replaces edit form (outerHTML swap)

#### Scenario: User deletion via HTMX
- **WHEN** user clicks delete button and confirms
- **THEN** browser shows confirmation dialog
- **AND** if confirmed, HTMX sends DELETE request to /users/:id
- **AND** server returns empty response
- **AND** user card is removed from DOM (outerHTML swap)

#### Scenario: User list refresh
- **WHEN** user clicks refresh button
- **THEN** HTMX requests user list via GET /users
- **AND** entire user grid is replaced with fresh data

### Requirement: JSX Layout Component System

The system SHALL use JSX components for generating HTML with reusable layout patterns.

#### Scenario: Layout component usage
- **WHEN** web route renders HTML page
- **THEN** route uses Layout component for consistent structure
- **AND** Layout provides HTML boilerplate, head, and body structure

#### Scenario: JSX component composition
- **WHEN** complex UI is needed (e.g., user management page)
- **THEN** UI is built from composable JSX components
- **AND** components accept props for dynamic content
- **AND** components return JSX elements

#### Scenario: TypeScript JSX configuration
- **WHEN** JSX is used in .tsx files
- **THEN** TypeScript compiles JSX using configured factory (Html.createElement)
- **AND** JSX fragments use configured fragment factory (Html.Fragment)
- **AND** compiled output works with @elysiajs/html plugin

### Requirement: Icon-Only Action Buttons

The system SHALL use icon-only buttons for user actions to reduce visual clutter while maintaining accessibility.

#### Scenario: Create button with icon
- **WHEN** create user button is rendered
- **THEN** button displays plus icon SVG
- **AND** button has title attribute for tooltip
- **AND** button has no text label

#### Scenario: Refresh button with icon
- **WHEN** refresh list button is rendered
- **THEN** button displays refresh/arrows icon SVG
- **AND** button has title attribute describing action

#### Scenario: Edit button with icon
- **WHEN** edit user button is rendered on user card
- **THEN** button displays pencil/edit icon SVG
- **AND** button has title attribute for accessibility

#### Scenario: Delete button with icon
- **WHEN** delete user button is rendered on user card
- **THEN** button displays trash/delete icon SVG
- **AND** button has title attribute warning about deletion

### Requirement: HTMX Swap Strategies

The system SHALL use appropriate HTMX swap strategies for different UI update patterns.

#### Scenario: Afterbegin swap for new items
- **WHEN** new user is created
- **THEN** HTMX uses afterbegin swap strategy
- **AND** new item appears at top of list

#### Scenario: OuterHTML swap for replacement
- **WHEN** user card is updated or deleted
- **THEN** HTMX uses outerHTML swap strategy
- **AND** entire element (including wrapper) is replaced or removed

#### Scenario: InnerHTML swap for form injection
- **WHEN** edit form is loaded into existing card
- **THEN** HTMX uses innerHTML swap strategy
- **AND** card wrapper remains, only content is replaced

### Requirement: Form Reset and Cleanup

The system SHALL automatically reset and clear forms after successful submissions.

#### Scenario: Create form reset after submission
- **WHEN** user is created successfully
- **THEN** form inputs are reset to empty values
- **AND** form container is cleared from DOM
- **AND** user can immediately create another user

#### Scenario: Edit form cancellation
- **WHEN** user wants to cancel edit
- **THEN** edit form is replaced with original user card
- **AND** no changes are persisted

### Requirement: Client-Side Confirmation Dialogs

The system SHALL require user confirmation for destructive actions.

#### Scenario: Delete confirmation
- **WHEN** user clicks delete button
- **THEN** browser displays confirmation dialog
- **AND** dialog message clearly states action ("Are you sure you want to delete this user?")
- **AND** delete operation only proceeds if user confirms
- **AND** operation is canceled if user declines

