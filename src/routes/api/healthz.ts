import { Elysia } from "elysia";


export const healthzRoute = new Elysia()
    .get("/healthz", () => {
        return { status: "ok" };
    });
