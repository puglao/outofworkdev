import { Elysia } from "elysia";
import { opentelemetry } from '@elysiajs/opentelemetry';
import { logger } from "@bogeychan/elysia-logger";

import { apiRoutes } from "./routes/api";
import { webRoutes } from "./routes/web";

const app = new Elysia({ detail: { hide: true } })
  .use(logger({ level: "info" }))
  .use(opentelemetry())
  .use(apiRoutes)
  .use(webRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`
);
