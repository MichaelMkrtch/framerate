import "dotenv/config";

import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { api } from "@server/api/api-index";
import { rateLimit } from "elysia-rate-limit";

let corsOriginConfig;

const regexPatternFromEnv = process.env.CORS_ORIGIN_REGEX_PATTERN;

if (regexPatternFromEnv) {
  try {
    corsOriginConfig = new RegExp(regexPatternFromEnv);
  } catch (e) {
    console.error(
      `SERVER: Invalid regex pattern in CORS_ORIGIN_REGEX_PATTERN: "${regexPatternFromEnv}". Error: ${e}`,
    );
    console.warn(
      "SERVER: Falling back to CLIENT_ORIGIN or default due to invalid regex.",
    );
    // Fallback
    corsOriginConfig = process.env.CLIENT_ORIGIN;
  }
} else if (process.env.CLIENT_ORIGIN) {
  corsOriginConfig = process.env.CLIENT_ORIGIN;
} else {
  console.warn(
    "SERVER: Neither CORS_ORIGIN_REGEX_PATTERN nor CLIENT_ORIGIN is set. CORS might be restrictive.",
  );
  corsOriginConfig = false;
}

const app = new Elysia()
  .use(swagger())
  .use(
    rateLimit({
      max: 100,
      errorResponse:
        "You have made too many requests. Please wait one minute before making another request.",
      scoping: "global",
    }),
  )
  .use(
    cors({
      origin: corsOriginConfig,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(api)
  .listen(8000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
