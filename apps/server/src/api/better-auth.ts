import type { Context } from "elysia";

import { Elysia } from "elysia";
import { auth } from "@server/lib/auth";

function betterAuthView(context: Context) {
  return auth.handler(context.request);
}

export const betterAuthHandler = new Elysia({ prefix: "/auth" })
  .get("/*", betterAuthView)
  .post("/*", betterAuthView);
