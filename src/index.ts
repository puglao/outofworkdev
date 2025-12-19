import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";

import { apiRoutes } from "./routes/api";
import { htmxRoutes } from "./routes/htmx";

const app = new Elysia({ detail: { hide: true } })
  .use(apiRoutes)
  .use(html())
  .use(staticPlugin())
  .use(htmxRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
