"use server";

import { eq } from "drizzle-orm";

import { type InsertUser, usersTable } from "../db/schema";

import { db } from "@/db";

export async function createUser(data: InsertUser) {
  const results = await db
    .insert(usersTable)
    .values(data)
    .returning({ id: usersTable.id });
  return results[0].id;
}

export async function getUserByEmail(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function getUserById(id: number) {
  const results = await db
    .select({ username: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return results[0];
}
