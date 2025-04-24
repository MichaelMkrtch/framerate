import { Elysia } from "elysia";

import { betterAuth } from "@server/middlewares/auth-middleware";
import { apiV1 } from "./v1";
import { betterAuthHandler } from "./better-auth";

export const api = new Elysia({ prefix: "/api" })
  .use(betterAuthHandler)
  .use(betterAuth)
  .use(apiV1);
