"use server";

import { db } from "@/drizzle";
import { InsertMovie, movieTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createMovie(movie: InsertMovie) {
  const [result] = await db
    .insert(movieTable)
    .values(movie)
    .onConflictDoNothing({ target: movieTable.id })
    .returning();

  return result;
}

export async function getMovie(movieId: number) {
  const [result] = await db
    .select()
    .from(movieTable)
    .where(eq(movieTable.id, movieId));

  return result;
}
