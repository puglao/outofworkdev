## Context

Users need dark mode support for reduced eye strain, battery savings on OLED screens, and personal preference. The implementation should feel seamless and respect user choices.

**Stakeholders**: End users, developers
**Constraints**: Must work with TailwindCSS CDN, no backend state needed

## Goals / Non-Goals

**Goals:**
- Provide instant theme switching via UI button
- Persist theme preference across sessions
- Respect system color scheme on first visit
- Smooth visual transitions between themes

**Non-Goals:**
- Server-side theme detection or rendering
- Multiple theme options beyond light/dark
- Per-page theme preferences

## Decisions

### Decision 1: Class-based Dark Mode

Use Tailwind's class-based dark mode with `dark` class on `<html>` element.

**Rationale**: Class-based approach provides instant control via JavaScript, avoids CSS media query delays, and allows localStorage persistence.

**Alternatives considered:**
- Media query based: Can't override system preference or persist user choice
- CSS variables: More complex, less integrated with Tailwind utilities

### Decision 2: localStorage Persistence

Store theme preference in `localStorage.theme` as 'dark' or 'light'.

**Rationale**: Simple, works offline, no backend needed, standard Web Storage API.

**Alternatives considered:**
- Cookies: Unnecessary server communication overhead
- Backend user preference: Too complex for MVP, requires authentication

### Decision 3: System Preference Detection

On first visit, detect system color scheme via `prefers-color-scheme` media query.

**Rationale**: Respects user's OS-level preference, good default UX, no initial choice required.

### Decision 4: Toggle Button Placement

Place theme toggle button in top-right corner of page.

**Rationale**: Standard location for theme toggles, doesn't interfere with content, easily accessible.

## Implementation Pattern

```javascript
// Initialization (runs immediately in <head>)
if (localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Toggle function
function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  } else {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  }
}
```

## Component Styling Strategy

All components follow this pattern:
- Light mode: Default Tailwind classes
- Dark mode: `dark:` variant classes

Example:
```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Flash of wrong theme on load | Initialize theme in `<head>` before body renders |
| Inconsistent dark mode colors | Use systematic color scale (gray-50 → gray-900) |
| Low contrast in dark mode | Test with WCAG contrast checker, use Tailwind's built-in accessible colors |

## Accessibility Considerations

- Theme toggle button has `aria-label="Toggle theme"`
- Color contrast meets WCAG AA standards
- Theme preference doesn't affect semantic HTML
- Works with screen readers (preference persists)

## Migration Plan

No breaking changes. Feature is additive:
1. Add theme toggle to layout
2. Add dark mode classes to components
3. No existing functionality affected

**Rollback**: Remove toggle button and dark mode classes.

## Open Questions

None.
