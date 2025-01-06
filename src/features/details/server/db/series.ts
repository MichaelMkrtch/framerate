"use server";

import { db } from "@/drizzle";
import { InsertShow, tvShowTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createSeries(series: InsertShow) {
  const [result] = await db
    .insert(tvShowTable)
    .values(series)
    .onConflictDoNothing({ target: tvShowTable.id })
    .returning();

  return result;
}

export async function getSeries(seriesId: number) {
  const [result] = await db
    .select()
    .from(tvShowTable)
    .where(eq(tvShowTable.id, seriesId));

  return result;
}
