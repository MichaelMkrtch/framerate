import { db } from "@server/drizzle";
import { list, listItem } from "@server/drizzle/schema";
import { and, asc, eq } from "drizzle-orm";

/**
 * Creates a list in database
 * @param data - The list data to insert
 * @returns The newly created list
 */
export async function createList(data: typeof list.$inferInsert) {
  const [result] = await db.insert(list).values(data).returning();
  const formattedResults = { type: "list" as const, ...result };
  return formattedResults;
}

/**
 * Gets all database lists belonging to a user
 * @param userId - The ID of the user for whom to get lists
 * @returns All lists belonging to the user
 */
export async function getLists(userId: string) {
  const results = await db
    .select()
    .from(list)
    .where(eq(list.userId, userId))
    .orderBy(asc(list.createdAt));

  const formattedResults = results.map((result) => ({
    type: "list" as const,
    ...result,
  }));
  return formattedResults;
}

/**
 * Adds list item to a user's existing database list
 * @param data - List item to insert
 * @returns The inserted list item or undefined
 */
export async function addListItem(data: typeof listItem.$inferInsert) {
  const [result] = await db.transaction(async (trx) => {
    const insertedItem = await trx.insert(listItem).values(data).returning();

    await trx
      .update(list)
      .set({ updatedAt: new Date() })
      .where(eq(list.id, listItem.listId));

    return insertedItem;
  });

  return result;
}

/**
 * Gets media saved to a list by the current user, if any
 * @param mediaId - The ID of the media to check
 * @param mediaType - The type of media ("movie" or "tv")
 * @returns The matching list item or undefined if it does not exist
 */
export async function getListItem(
  userId: string,
  mediaId: number,
  mediaType: "movie" | "tv",
) {
  // Determine which field to query based on media type
  const mediaField = mediaType === "movie" ? "movieId" : "seriesId";

  const [result] = await db
    .select({
      listId: listItem.listId,
      listItemId: listItem.id,
      mediaType: listItem.mediaType,
      mediaId: mediaType === "movie" ? listItem.movieId : listItem.seriesId,
    })
    .from(listItem)
    .where(and(eq(listItem.userId, userId), eq(listItem[mediaField], mediaId)));

  return result;
}

/**
 * Removes specific media from a user's list
 * @param listItemId - ID of the media to remove from a list
 * @returns The removed list item or undefined
 */
export async function deleteListItem(userId: string, listItemId: number) {
  const [result] = await db
    .delete(listItem)
    .where(and(eq(listItem.userId, userId), eq(listItem.id, listItemId)))
    .returning();

  return result;
}
