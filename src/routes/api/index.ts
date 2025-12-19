import { Elysia } from "elysia";
import { healthzRoute } from "./healthz";
import { openapi } from '@elysiajs/openapi';


export const apiRoutes = new Elysia({ prefix: "/api", detail: { hide: false } })
    .use(openapi({
        exclude: {
            paths: [

                // exclude everything not under /api
                /^\/(?!api\/).*/,
            ]
        }
    }
    ))
    .use(healthzRoute);