## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: TailwindCSS Styling

The system SHALL use TailwindCSS v4 via CDN for styling with class-based dark mode support.

#### Scenario: Tailwind classes applied
- **WHEN** HTML elements include Tailwind utility classes
- **THEN** styles are applied correctly in the browser

#### Scenario: Dark mode classes
- **WHEN** HTML elements include dark mode variant classes (e.g., `dark:bg-gray-800`)
- **THEN** dark mode styles are applied when dark theme is active
- **AND** light mode styles are applied when light theme is active
