import { Elysia } from "elysia";

import { apiV1 } from "./v1";
import { betterAuthHandler } from "./better-auth";
import { betterAuth } from "@/middlewares/auth-middleware";

export const api = new Elysia({ prefix: "/api" })
  .use(betterAuthHandler)
  .use(betterAuth)
  .use(apiV1);
