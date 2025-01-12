"use server";

import { headers } from "next/headers";

import { db } from "@/drizzle";
import {
  InsertList,
  listItemTable,
  listTable,
  movieTable,
  tvShowTable,
  user,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

async function verifyUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user;
}

// List
export async function createList(list: InsertList) {
  const user = await verifyUser();

  if (user?.id) {
    const [result] = await db.insert(listTable).values(list).returning();
    const formattedResults = { type: "list", ...result };
    return formattedResults;
  }
  return null;
}

export async function getLists() {
  const user = await verifyUser();

  if (user?.id) {
    const results = await db
      .select()
      .from(listTable)
      .where(eq(listTable.userId, user.id));

    const formattedResults = results.map((result) => ({
      type: "list" as const,
      ...result,
    }));
    return formattedResults;
  }
  return null;
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

export async function getMoviesFromList(userId: string, listId: number) {
  // No userId check since it comes from DB
  const results = await db
    .select({
      listId: listItemTable.listId,
      mediaId: movieTable.id,
      listItemId: listItemTable.id,
      title: movieTable.title,
      posterPath: movieTable.posterPath,
      createdAt: listItemTable.createdAt,
      updatedAt: listItemTable.updatedAt,
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

export async function getSeriesFromList(userId: string, listId: number) {
  // No userId check since it comes from DB
  const results = await db
    .select({
      listId: listItemTable.listId,
      mediaId: tvShowTable.id,
      listItemId: listItemTable.id,
      title: tvShowTable.title,
      posterPath: tvShowTable.posterPath,
      createdAt: listItemTable.createdAt,
      updatedAt: listItemTable.updatedAt,
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
