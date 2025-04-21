import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/drizzle/index";

export const auth = betterAuth({
  appName: "FrameRate",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 40,
    autoSignIn: true,
  },
  session: {
    expiresIn: 1209600, // 14 days
    updateAge: 86400, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  advanced: {
    cookiePrefix: "framerate",
  },
  plugins: [username({ minUsernameLength: 1, maxUsernameLength: 20 })],
});
