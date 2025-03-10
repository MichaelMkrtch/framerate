"use server";

import type { InsertList, InsertListItem } from "@/drizzle/schema";

import { headers } from "next/headers";

import { db } from "@/drizzle";
import {
  likedListTable,
  listItemTable,
  listSlugHistoryTable,
  listTable,
  listViewsTable,
  movieTable,
  savedListTable,
  tvShowTable,
  user,
} from "@/drizzle/schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";

import { verifyUser } from "@/features/collections/server/db/verifyUser";
import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

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
    .where(eq(listTable.userId, userId))
    .orderBy(asc(listTable.createdAt));

  const formattedResults = results.map((result) => ({
    type: "list" as const,
    ...result,
  }));
  return formattedResults;
}

export async function updateList(
  userId: string,
  listName: string,
  slug: string,
) {
  try {
    const result = await db.transaction(async (trx) => {
      const [list] = await trx
        .select()
        .from(listTable)
        .where(and(eq(listTable.userId, userId), eq(listTable.slug, slug)));

      if (!list) throw new Error("Couldn't get list");

      const oldSlug = list.slug;

      await trx
        .insert(listSlugHistoryTable)
        .values({ listId: list.id, oldSlug });

      const newSlug = await generateSlug(listName, "list", userId);

      const [updateResult] = await trx
        .update(listTable)
        .set({ name: listName, slug: newSlug, updatedAt: new Date() })
        .where(and(eq(listTable.userId, userId), eq(listTable.slug, slug)))
        .returning();

      return updateResult;
    });
    return result;
  } catch (_error) {
    throw new Error("An error occurred while updating the list.");
  }
}

export async function deleteList(userId: string, listId: number) {
  try {
    if (!userId || !listId) {
      throw new Error("Error: Invalid inputs");
    }

    const [list] = await db
      .select()
      .from(listTable)
      .where(and(eq(listTable.userId, userId), eq(listTable.id, listId)));

    if (!list) {
      throw new Error("You are not authorized to make changes to this list.");
    }

    const [result] = await db.transaction(async (trx) => {
      await trx.delete(likedListTable).where(eq(likedListTable.listId, listId));
      await trx.delete(savedListTable).where(eq(savedListTable.listId, listId));
      await trx.delete(listViewsTable).where(eq(listViewsTable.listId, listId));
      await trx
        .delete(listSlugHistoryTable)
        .where(eq(listSlugHistoryTable.listId, listId));
      await trx.delete(listItemTable).where(eq(listItemTable.listId, listId));
      const list = await trx
        .delete(listTable)
        .where(eq(listTable.id, listId))
        .returning();

      return list;
    });

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete list.";

    throw new Error(errorMessage);
  }
}

export async function addLikedList(userId: string, listId: number) {
  const result = await db.transaction(async (trx) => {
    await trx.insert(likedListTable).values({ userId, listId });
    const [listResult] = await trx
      .update(listTable)
      .set({ likeCount: sql`${listTable.likeCount} + 1` })
      .where(eq(listTable.id, listId))
      .returning();

    return listResult;
  });

  return { likeCount: result.likeCount };
}

export async function addSavedList(userId: string, listId: number) {
  const result = await db.transaction(async (trx) => {
    await trx.insert(savedListTable).values({ userId, listId });
    const [listResult] = await trx
      .update(listTable)
      .set({ saveCount: sql`${listTable.saveCount} + 1` })
      .where(eq(listTable.id, listId))
      .returning();

    return listResult;
  });

  return { saveCount: result.saveCount };
}

export async function removeLikedList(userId: string, listId: number) {
  const result = await db.transaction(async (trx) => {
    await trx
      .delete(likedListTable)
      .where(
        and(
          eq(likedListTable.userId, userId),
          eq(likedListTable.listId, listId),
        ),
      );
    const [listResult] = await trx
      .update(listTable)
      .set({ likeCount: sql`${listTable.likeCount} - 1` })
      .where(eq(listTable.id, listId))
      .returning();

    return listResult;
  });

  return { likeCount: result.likeCount };
}

export async function removeSavedList(userId: string, listId: number) {
  const result = await db.transaction(async (trx) => {
    await trx
      .delete(savedListTable)
      .where(
        and(
          eq(savedListTable.userId, userId),
          eq(savedListTable.listId, listId),
        ),
      );
    const [listResult] = await trx
      .update(listTable)
      .set({ saveCount: sql`${listTable.saveCount} - 1` })
      .where(eq(listTable.id, listId))
      .returning();

    return listResult;
  });

  return { saveCount: result.saveCount };
}

// List items
export async function addListItem(listItem: InsertListItem) {
  const [result] = await db.transaction(async (trx) => {
    const insertedItem = await trx
      .insert(listItemTable)
      .values(listItem)
      .returning();

    await trx
      .update(listTable)
      .set({ updatedAt: new Date() })
      .where(eq(listTable.id, listItem.listId));

    return insertedItem;
  });

  return result;
}

export async function getListData(username: string, slug: string) {
  const [results] = await db
    .select()
    .from(listTable)
    .innerJoin(user, eq(user.id, listTable.userId))
    .where(and(eq(user.username, username), eq(listTable.slug, slug)));

  if (!results) {
    throw new Error("Error: something went wrong!");
  }

  const { list } = results;
  const session = await auth.api.getSession({ headers: await headers() });

  const listItems = await getListItems(list.id);

  if (session?.user) {
    const isLiked = await getLikeStatus(session.user.id, list.id);
    const isSaved = await getSaveStatus(session.user.id, list.id);

    return {
      list: { type: "list" as const, ...list },
      isLiked,
      isSaved,
      listItems,
    };
  } else {
    return {
      list: { type: "list" as const, ...list },
      isLiked: false,
      isSaved: false,
      listItems,
    };
  }

  // // If slug is outdated, gets new slug for redirect
  // const [{ list: listFromHistory }] = await db
  //   .select()
  //   .from(listTable)
  //   .innerJoin(
  //     listSlugHistoryTable,
  //     eq(listTable.id, listSlugHistoryTable.listId),
  //   )
  //   .where(eq(listSlugHistoryTable.oldSlug, slug));

  // return {
  //   list: null,
  //   redirectSlug: listFromHistory.slug,
  // };
}

async function getListItems(listId: number) {
  try {
    const results = await db
      .select({
        listId: listItemTable.listId,
        mediaId: sql<number>`COALESCE(${movieTable.id}, ${tvShowTable.id})`,
        listItemId: listItemTable.id,
        title: sql<string>`COALESCE(${movieTable.title}, ${tvShowTable.title})`,
        posterPath: sql<string>`COALESCE(${movieTable.posterPath}, ${tvShowTable.posterPath})`,
        createdAt: listItemTable.createdAt,
        mediaType: sql<"movie" | "tv">`CASE
            WHEN ${movieTable.id} IS NOT NULL THEN 'movie'
            ELSE 'tv'
          END`,
      })
      .from(listItemTable)
      .leftJoin(movieTable, eq(listItemTable.movieId, movieTable.id))
      .leftJoin(tvShowTable, eq(listItemTable.seriesId, tvShowTable.id))
      .where(eq(listItemTable.listId, listId))
      .orderBy(desc(listItemTable.createdAt));

    return results;
  } catch (_error) {
    throw new Error("Failed to get list items.");
  }
}

async function getLikeStatus(userId: string, listId: number): Promise<boolean> {
  try {
    const [result]: Record<"isliked", boolean>[] = await db.execute(
      sql`SELECT EXISTS (
        SELECT 1 FROM ${likedListTable}
        WHERE ${likedListTable.userId} = ${userId}
        AND ${likedListTable.listId} = ${listId}
      ) as isliked`,
    );

    const result2 = await db
      .select()
      .from(likedListTable)
      .where(
        and(
          eq(likedListTable.userId, userId),
          eq(likedListTable.listId, listId),
        ),
      );

    console.log("2", result2);

    return result.isliked;
  } catch (_error) {
    throw new Error("Failed to get like status!");
  }
}

async function getSaveStatus(userId: string, listId: number): Promise<boolean> {
  try {
    const [result]: Record<"issaved", boolean>[] = await db.execute(
      sql`SELECT EXISTS (
        SELECT 1 FROM ${savedListTable}
        WHERE ${savedListTable.userId} = ${userId}
        AND ${savedListTable.listId} = ${listId}
      ) as issaved`,
    );

    return result.issaved;
  } catch (_error) {
    throw new Error("Failed to get save status!");
  }
}

export async function deleteListItem(listItemId: number) {
  const [result] = await db
    .delete(listItemTable)
    .where(eq(listItemTable.id, listItemId))
    .returning();

  if (!result) {
    throw new Error("Something went wrong while deleting from list!");
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
