// import supabase from "@/utils/supabase/client";
import { type InsertUser, usersTable } from "../db/schema";

import { db } from "@/db";

export async function createUser(data: InsertUser) {
  const userID = await db
    .insert(usersTable)
    .values(data)
    .returning({ id: usersTable.id });
  return userID[0].id;
}
