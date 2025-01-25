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
import { and, asc, desc, eq, sql } from "drizzle-orm";

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
    .where(eq(listTable.userId, userId))
    .orderBy(asc(listTable.createdAt));

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

export async function getListData(username: string, slug: string) {
  const [{ listId, listName }] = await db
    .select({ listId: listTable.id, listName: listTable.name })
    .from(listTable)
    .innerJoin(user, eq(user.id, listTable.userId))
    .where(and(eq(user.username, username), eq(listTable.slug, slug)));

  if (listId) {
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

    return { listName, listItems: results };
  }
  throw new Error("Something went wrong while fetching list data!");
}

export async function deleteListItem(listItemId: number) {
  const [result] = await db
    .delete(listItemTable)
    .where(eq(listItemTable.id, listItemId))
    .returning();

  if (!result) {
    throw new Error("Something went wrong while deleting from list!");
  }

  return result;
}

// export async function deleteListItem(
//   userId: string,
//   mediaType: "movie" | "tv",
//   listItemId: number,
//   mediaId: number,
// ): Promise<"success" | "fail"> {
//   if (mediaType === "movie") {
//     const [result] = await db
//       .delete(listItemTable)
//       .where(
//         and(
//           eq(listItemTable.userId, userId),
//           eq(listItemTable.id, listItemId),
//           eq(listItemTable.movieId, mediaId),
//         ),
//       )
//       .returning();

//     return result ? "success" : "fail";
//   } else {
//     const [result] = await db
//       .delete(listItemTable)
//       .where(
//         and(
//           eq(listItemTable.userId, userId),
//           eq(listItemTable.id, listItemId),
//           eq(listItemTable.seriesId, mediaId),
//         ),
//       )
//       .returning();

//     return result ? "success" : "fail";
//   }
// }

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
