## Context

The project needs a frontend to allow users to interact with the knowledge base system. The tech stack specifies HTMX and TailwindCSS. HTMX enables dynamic UIs by extending HTML with attributes for AJAX, WebSockets, and SSE - no JavaScript framework needed.

**Stakeholders**: Developers, end users
**Constraints**: Must use Bun runtime, keep stack minimal, server-centric architecture

## Goals / Non-Goals

**Goals:**
- Provide HTMX-powered frontend for dynamic interactions
- Server returns HTML fragments, HTMX swaps them into DOM
- TailwindCSS for styling
- Support WebSocket/SSE for real-time updates (per project conventions)

**Non-Goals:**
- Client-side state management
- SPA routing (server controls navigation)
- Complex client-side JavaScript

## Decisions

### Decision 1: HTMX for Dynamic Behavior

Use HTMX instead of a JavaScript framework.

**Rationale**: HTMX aligns with server-centric architecture. Elysia returns HTML, HTMX handles DOM updates. No build step for JS components. Simpler mental model.

**Alternatives considered:**
- Svelte/React: More complex, requires build plugins, client-side state
- Vanilla JS: More code to write, reinventing HTMX

### Decision 2: @elysiajs/html Plugin

Use Elysia's html plugin for type-safe HTML responses.

**Rationale**: Provides JSX-like syntax for HTML generation in TypeScript. Works well with HTMX partial responses.

### Decision 3: Static Assets via @elysiajs/static

Serve CSS, HTMX library, and other static files from `public/` directory.

**Rationale**: Standard pattern for serving static assets. HTMX loaded via CDN or local file.

### Decision 4: TailwindCSS via bun-plugin-tailwind

Process TailwindCSS using Bun's native plugin system.

**Rationale**: No Vite/PostCSS setup needed. Bun handles CSS processing.

## Directory Structure

```
/
├── bunfig.toml               # Tailwind plugin config
├── src/
│   ├── index.ts              # Elysia server with plugins
│   └── views/                # HTML template functions
│       └── layout.ts         # Base layout wrapper
└── public/
    ├── styles.css            # TailwindCSS source
    └── htmx.min.js           # HTMX library (or use CDN)
```

## HTMX Patterns

### Full Page Load
```html
<!-- Elysia returns full HTML page -->
<html>
  <body hx-boost="true">
    <nav>...</nav>
    <main id="content">...</main>
  </body>
</html>
```

### Partial Updates
```html
<!-- Button triggers partial update -->
<button hx-get="/api/data" hx-target="#content" hx-swap="innerHTML">
  Load Data
</button>
```

### WebSocket/SSE (Future)
```html
<!-- Real-time updates per project conventions -->
<div hx-ext="sse" sse-connect="/events" sse-swap="message">
  <!-- Server-sent content appears here -->
</div>
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Less interactive than SPA | HTMX handles most use cases; add JS sparingly if needed |
| Server load for HTML generation | Acceptable for MVP scale; cache if needed |
| Learning curve for HTMX patterns | Well-documented; simpler than framework state management |

## Migration Plan

1. Install Elysia plugins (static, html)
2. Create public/ directory with styles and HTMX
3. Update src/index.ts to use plugins
4. Create base layout template
5. Convert existing route to return HTML

**Rollback**: Git revert; no database changes.

## Open Questions

None.
