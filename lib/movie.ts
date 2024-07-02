"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { InsertMovie, moviesTable } from "@/db/schema";

export async function createMovie(data: InsertMovie) {
  await db
    .insert(moviesTable)
    .values(data)
    .onConflictDoNothing({ target: moviesTable.id });
}

export async function getMovie(data: { movieId: number }) {
  const result = await db
    .select()
    .from(moviesTable)
    .where(eq(moviesTable.id, data.movieId));
  return result;
}
