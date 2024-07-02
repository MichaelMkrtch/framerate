import { db } from "@/db";
import { InsertMovie, moviesTable } from "@/db/schema";

export async function createMovie(data: InsertMovie) {
  await db
    .insert(moviesTable)
    .values(data)
    .onConflictDoNothing({ target: moviesTable.id });
}
