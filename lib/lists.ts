"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { InsertList, listsTable } from "@/db/schema";

export async function createList(data: InsertList) {
  const results = await db.insert(listsTable).values(data).returning();

  return results[0];
}
