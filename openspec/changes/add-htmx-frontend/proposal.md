# Change: Add HTMX Frontend with Elysia

## Why

The project requires a frontend for user interaction with the knowledge base system. The tech stack specifies HTMX and TailwindCSS. HTMX provides dynamic behavior via HTML attributes without a JavaScript framework, keeping the stack minimal and server-centric.

## What Changes

- Add `@elysiajs/static` plugin to serve static assets
- Add `@elysiajs/html` plugin for HTML responses
- Create `public/` directory with HTML templates and assets
- Configure TailwindCSS via `bun-plugin-tailwind`
- Update Elysia routes to return HTML fragments for HTMX

## Impact

- Affected specs: New `frontend` capability
- Affected code:
  - `src/index.ts` - Add static and html plugins, HTMX-compatible routes
  - `package.json` - Add plugin dependencies
  - `bunfig.toml` - Tailwind plugin configuration
  - `public/` - New directory for HTML and static assets
