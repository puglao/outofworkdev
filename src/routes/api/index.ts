import { Elysia } from "elysia";
import { healthzRoute } from "./healthz";
import { usersRoute } from "./users";
import { openapi, fromTypes } from '@elysiajs/openapi';


export const apiRoutes = new Elysia({ prefix: "/api", detail: { hide: false } })
    .use(openapi({
        references: fromTypes()
    }
    ))
    .use(healthzRoute)
    .use(usersRoute);