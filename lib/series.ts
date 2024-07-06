"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { InsertShow, tvShowsTable } from "@/db/schema";

export async function createSeries(data: InsertShow) {
  await db
    .insert(tvShowsTable)
    .values(data)
    .onConflictDoNothing({ target: tvShowsTable.id });
}

export async function getSeries(data: { seriesId: number }) {
  const result = await db
    .select()
    .from(tvShowsTable)
    .where(eq(tvShowsTable.id, data.seriesId));
  return result;
}
