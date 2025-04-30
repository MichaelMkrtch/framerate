import { db } from "@server/drizzle";
import { movie } from "@server/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * @param id - The ID of the movie to get
 * @returns The poster and backdrop from the database
 */
export async function getMovieMedia(id: number) {
  const [result] = await db
    .select({ posterPath: movie.posterPath, backdropPath: movie.backdropPath })
    .from(movie)
    .where(eq(movie.id, id));

  return result;
}

/**
 * @param data - The movie object to add to the database
 * @returns The created movie
 */
export async function addMovieToDB(data: typeof movie.$inferInsert) {
  const [result] = await db
    .insert(movie)
    .values(data)
    .onConflictDoNothing({ target: movie.id })
    .returning();

  return result;
}
