## 1. Dependencies

- [x] 1.1 Install `@elysiajs/static` plugin
- [x] 1.2 Install `@elysiajs/html` plugin
- [x] 1.3 Install `tailwindcss@4` and `bun-plugin-tailwind`

## 2. Configuration

- [x] 2.1 Create `bunfig.toml` with tailwind plugin

## 3. Frontend Structure

- [x] 3.1 Create `public/styles.css` with Tailwind imports
- [x] 3.2 Add HTMX (via CDN link or local file in public/)

## 4. Elysia Integration

- [x] 4.1 Update `src/index.ts` to use static and html plugins
- [x] 4.2 Create base layout function in `src/views/layout.ts`
- [x] 4.3 Update root route to return HTML page with HTMX

## 5. Validation

- [x] 5.1 Verify `bun run dev` starts server
- [x] 5.2 Verify root route returns HTML with HTMX loaded
- [x] 5.3 Verify TailwindCSS classes are applied
- [x] 5.4 Verify HTMX partial updates work
