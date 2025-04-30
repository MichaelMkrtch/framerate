import { db } from "@server/drizzle";
import { getTables } from "@server/lib/utils";
import { eq } from "drizzle-orm";

// /**
//  * @param data - The movie object to add to the database
//  * @returns The created movie
//  */
// export async function addMovieToDB(data: typeof movie.$inferInsert) {
//   const [result] = await db
//     .insert(movie)
//     .values(data)
//     .onConflictDoNothing({ target: movie.id })
//     .returning();

//   return result;
// }
