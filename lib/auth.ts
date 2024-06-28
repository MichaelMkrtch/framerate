import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { cookies } from "next/headers";

import { db } from "@/db";
import { sessionsTable, usersTable } from "@/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: number) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
  }
}
