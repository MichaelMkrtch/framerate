"use server";

import { db } from "@/drizzle";
import {
  InsertList,
  InsertListItem,
  listItemTable,
  listTable,
  movieTable,
  tvShowTable,
  user,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/features/collections/server/db/verifyUser";

// List
export async function createList(list: InsertList) {
  const [result] = await db.insert(listTable).values(list).returning();
  const formattedResults = { type: "list" as const, ...result };
  return formattedResults;
}

export async function getLists(userId: string) {
  const results = await db
    .select()
    .from(listTable)
    .where(eq(listTable.userId, userId));

  const formattedResults = results.map((result) => ({
    type: "list" as const,
    ...result,
  }));
  return formattedResults;
}

export async function deleteList(listId: number) {
  const user = await verifyUser();

  if (user?.id) {
    await db
      .delete(listTable)
      .where(and(eq(listTable.userId, user.id), eq(listTable.id, listId)));
    return;
  }
  return null;
}

// List items
export async function addListItem(listItem: InsertListItem) {
  const [result] = await db.insert(listItemTable).values(listItem).returning();

  return result;
}

export async function getListItems(username: string, listId: number) {
  // Resolves username to userId to allow public list viewing
  const [{ id: userId }] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.username, username));

  if (userId) {
    const movieResults = await getMoviesFromList(userId, listId);
    const tvResults = await getSeriesFromList(userId, listId);

    if (tvResults && movieResults) {
      const results = [...movieResults, ...tvResults];
      return results;
    }
  }
  return null;
}

async function getMoviesFromList(userId: string, listId: number) {
  // No userId check since it comes from DB
  const results = await db
    .select({
      listId: listItemTable.listId,
      mediaId: movieTable.id,
      listItemId: listItemTable.id,
      title: movieTable.title,
      posterPath: movieTable.posterPath,
      createdAt: listItemTable.createdAt,
    })
    .from(movieTable)
    .innerJoin(listItemTable, eq(listItemTable.movieId, movieTable.id))
    .where(
      and(eq(listItemTable.listId, listId), eq(listItemTable.userId, userId)),
    );

  const formattedResults = results.map((result) => ({
    ...result,
    mediaType: "movie" as const,
  }));

  return formattedResults;
}

async function getSeriesFromList(userId: string, listId: number) {
  // No userId check since it comes from DB
  const results = await db
    .select({
      listId: listItemTable.listId,
      mediaId: tvShowTable.id,
      listItemId: listItemTable.id,
      title: tvShowTable.title,
      posterPath: tvShowTable.posterPath,
      createdAt: listItemTable.createdAt,
    })
    .from(tvShowTable)
    .innerJoin(listItemTable, eq(listItemTable.seriesId, tvShowTable.id))
    .where(
      and(eq(listItemTable.listId, listId), eq(listItemTable.userId, userId)),
    );

  const formattedResults = results.map((result) => ({
    ...result,
    mediaType: "tv" as const,
  }));

  return formattedResults;
}

export async function deleteListItem(
  userId: string,
  mediaType: "movie" | "tv",
  listItemId: number,
  mediaId: number,
): Promise<"success" | "fail"> {
  if (mediaType === "movie") {
    const [result] = await db
      .delete(listItemTable)
      .where(
        and(
          eq(listItemTable.userId, userId),
          eq(listItemTable.id, listItemId),
          eq(listItemTable.movieId, mediaId),
        ),
      )
      .returning();

    return result ? "success" : "fail";
  } else {
    const [result] = await db
      .delete(listItemTable)
      .where(
        and(
          eq(listItemTable.userId, userId),
          eq(listItemTable.id, listItemId),
          eq(listItemTable.seriesId, mediaId),
        ),
      )
      .returning();

    return result ? "success" : "fail";
  }
}

export async function deleteAllListItems(listId: number) {
  const user = await verifyUser();

  if (user?.id) {
    const [result] = await db
      .delete(listItemTable)
      .where(
        and(
          eq(listItemTable.userId, user.id),
          eq(listItemTable.listId, listId),
        ),
      );

    return result ? "success" : "fail";
  }
}
