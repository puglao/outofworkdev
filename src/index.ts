import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { layout } from "./views/layout";

const app = new Elysia()
  .use(html())
  .use(await staticPlugin())
  .get("/", () => {
    return layout(`
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
      <p class="text-gray-600 mb-6">A single source of truth for AI agents.</p>
      <button
        hx-get="/api/hello"
        hx-target="#demo"
        hx-swap="innerHTML"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Load Demo
      </button>
      <div id="demo" class="mt-4 p-4 border rounded"></div>
    `);
  })
  .get("/api/hello", () => {
    return `<p class="text-green-600 font-medium">Hello from HTMX! 🎉</p>`;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
