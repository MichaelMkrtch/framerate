import { Elysia } from "elysia";

export const apiV1 = new Elysia({ prefix: "/v1" }).get("/", () => "API V1");
