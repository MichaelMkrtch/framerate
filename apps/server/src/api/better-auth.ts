import { Elysia, Context } from "elysia";
import { auth } from "@/lib/auth";

function betterAuthView(context: Context) {
  return auth.handler(context.request);
}

export const betterAuthHandler = new Elysia({ prefix: "/auth" })
  .get("/*", betterAuthView)
  .post("/*", betterAuthView);
