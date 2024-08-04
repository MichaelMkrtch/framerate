"use server";

import { and, eq } from "drizzle-orm";

import { validUser } from "./movieReview";

import { db } from "@/db";
import {
  InsertList,
  InsertListContent,
  listContentTable,
  listsTable,
} from "@/db/schema";

export async function createList(data: InsertList) {
  const results = await db.insert(listsTable).values(data).returning();

  const formattedResults = results.map((result) => ({
    ...result,
    type: "list" as const,
  }));
  return formattedResults[0];
}

export async function getLists() {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const results = await db
      .select()
      .from(listsTable)
      .where(eq(listsTable.userId, userId));

    const formattedResults = results.map((result) => ({
      ...result,
      type: "list" as const,
    }));

    return formattedResults;
  }
}

export async function addToList(data: InsertListContent[]) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && data.length > 0) {
    data.forEach(async (dataEl) => {
      await db.insert(listContentTable).values(dataEl);
    });

    // const results = await db.insert(listContentTable).values(data).returning();

    //   const formattedResults = results.map((result) => ({
    //     ...result,
    //     type: "listContent" as const,
    //   }));
    //   return formattedResults;
    // } else {
    //   return null;
    // }
  }
}

export async function removeFromList(
  listId: number,
  mediaId: number,
  mediaType: "movie" | "tv",
) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    await db
      .delete(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.listId, listId),
          eq(listContentTable.movieId, mediaId),
        ),
      );
  } else if (userId && mediaType === "tv") {
    await db
      .delete(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.listId, listId),
          eq(listContentTable.seriesId, mediaId),
        ),
      );
  }
}

export async function checkIfSaved(mediaId: number, mediaType: "movie" | "tv") {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    const result = await db
      .select()
      .from(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.movieId, mediaId),
        ),
      );

    return result;
  } else if (userId && mediaType === "tv") {
    const result = await db
      .select()
      .from(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.seriesId, mediaId),
        ),
      );

    return result;
  }
}
