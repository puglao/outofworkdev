# Change: Add Dark Theme Toggle with localStorage Persistence

## Why

Users need the ability to view the application in dark mode for reduced eye strain and personal preference. Dark mode should persist across sessions and respect system preferences when first visited.

## What Changes

- Add theme toggle button with moon/sun icons in the UI
- Implement localStorage persistence for theme preference
- Add system preference detection for initial theme
- Apply Tailwind dark mode classes to all UI components
- Configure Tailwind with class-based dark mode

## Impact

- Affected specs: Existing `frontend` capability (MODIFIED)
- Affected code:
  - `src/views/layout.ts` - Add dark mode configuration, theme toggle function, localStorage logic
  - `src/routes/htmx/index.ts` - Add dark mode classes to all components, add theme toggle button
