import "dotenv/config";

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { api } from "@server/api/api-index";
import { rateLimit } from "elysia-rate-limit";

const app = new Elysia()
  .use(swagger())
  .use(
    rateLimit({
      max: 60,
      errorResponse:
        "You have made too many requests. Please wait one minute before making another request.",
      scoping: "global",
    }),
  )
  .use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(api)
  .get("/", () => "Hello Elysia")
  .listen(8000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
