import type { Session, User } from "better-auth";

import { db } from "@server/drizzle";
import {
  likedList,
  list,
  listItem,
  movie,
  savedList,
  tv,
  user,
} from "@server/drizzle/schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";

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
      .where(eq(list.id, data.listId));

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
 * Gets list data, including list items and metadata
 * @param username - The username of the user who created the list
 * @param slug - The list URL slug
 * @param userSession - If the list viewer is logged in, this is their active session
 * @returns An object with the list's data
 */
export async function getListData(
  username: string,
  slug: string,
  userSession: User | undefined,
) {
  const [results] = await db
    .select()
    .from(list)
    .innerJoin(user, eq(user.id, list.userId))
    .where(and(eq(user.username, username), eq(list.slug, slug)));

  if (!results) {
    throw new Error("Error: something went wrong!");
  }

  const { list: listResult } = results;

  const listItems = await getListItems(listResult.id);

  if (userSession) {
    const isLiked = await getLikeStatus(userSession.id, listResult.id);
    const isSaved = await getSaveStatus(userSession.id, listResult.id);

    return {
      list: { type: "list" as const, ...listResult },
      isLiked,
      isSaved,
      listItems,
    };
  }

  return {
    list: { type: "list" as const, ...listResult },
    isLiked: false,
    isSaved: false,
    listItems,
  };
}

/**
 * Gets all list items belonging to a list
 * @param listId - The ID of the list
 * @returns An array of list item objects
 */
async function getListItems(listId: number) {
  try {
    const results = await db
      .select({
        listId: listItem.listId,
        mediaId: sql<number>`COALESCE(${movie.id}, ${tv.id})`,
        listItemId: listItem.id,
        title: sql<string>`COALESCE(${movie.title}, ${tv.title})`,
        posterPath: sql<string>`COALESCE(${movie.posterPath}, ${tv.posterPath})`,
        createdAt: listItem.createdAt,
        mediaType: sql<"movie" | "tv">`CASE
            WHEN ${movie.id} IS NOT NULL THEN 'movie'
            ELSE 'tv'
          END`,
      })
      .from(listItem)
      .leftJoin(movie, eq(listItem.movieId, movie.id))
      .leftJoin(tv, eq(listItem.seriesId, tv.id))
      .where(eq(listItem.listId, listId))
      .orderBy(desc(listItem.createdAt));

    return results;
  } catch (_error) {
    throw new Error("Failed to get list items.");
  }
}

/**
 * Checks if the user has liked a list
 * @param userId - ID of the user
 * @param listId - ID of the list to check
 * @returns Boolean representing whether the list is liked by the user
 */
async function getLikeStatus(userId: string, listId: number): Promise<boolean> {
  try {
    const [result]: Record<"isliked", boolean>[] = await db.execute(
      sql`SELECT EXISTS (
        SELECT 1 FROM ${likedList}
        WHERE ${likedList.userId} = ${userId}
        AND ${likedList.listId} = ${listId}
      ) as isliked`,
    );

    if (result && result.isliked) {
      return result.isliked;
    }

    return false;
  } catch (_error) {
    throw new Error("Failed to get like status!");
  }
}

/**
 * Checks if the user has saved a list
 * @param userId - ID of the user
 * @param listId - ID of the list to check
 * @returns Boolean representing whether the list is saved by the user
 */
async function getSaveStatus(userId: string, listId: number): Promise<boolean> {
  try {
    const [result]: Record<"issaved", boolean>[] = await db.execute(
      sql`SELECT EXISTS (
        SELECT 1 FROM ${savedList}
        WHERE ${savedList.userId} = ${userId}
        AND ${savedList.listId} = ${listId}
      ) as issaved`,
    );

    if (result && result.issaved) {
      return result.issaved;
    }

    return false;
  } catch (_error) {
    throw new Error("Failed to get save status!");
  }
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
