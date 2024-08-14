"use server";

import { and, eq } from "drizzle-orm";

import { type ListContent } from "@/types";

import { pick } from "@/utils/pickProperties";
import { renameKeys } from "@/utils/renameKeys";

import { validUser } from "./movieReview";

import { db } from "@/db";
import {
  InsertList,
  InsertListContent,
  listContentTable,
  listsTable,
  moviesTable,
  tvShowsTable,
} from "@/db/schema";

export async function createList(data: InsertList) {
  const results = await db.insert(listsTable).values(data).returning();

  const formattedResults = results.map((result) => ({
    ...result,
    type: "list" as const,
  }));
  return formattedResults[0];
}

export async function deleteList(listId: number) {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    await db
      .delete(listsTable)
      .where(and(eq(listsTable.userId, userId), eq(listsTable.id, listId)));
  }
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

export async function addToList(data: InsertListContent) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const results = await db.insert(listContentTable).values(data).returning({
      listContentId: listContentTable.id,
      listId: listContentTable.listId,
      movieId: listContentTable.movieId,
      seriesId: listContentTable.seriesId,
      mediaType: listContentTable.mediaType,
      createdAt: listContentTable.createdAt,
    });

    const renamedResults = results.map((result) => {
      if (result.mediaType === "movie") {
        const renamed = renameKeys(
          { movieId: "mediaId" },
          result,
        ) as ListContent;
        return pick(
          renamed,
          "listContentId",
          "listId",
          "mediaId",
          "mediaType",
          "createdAt",
        );
      } else {
        const renamed = renameKeys(
          { seriesId: "mediaId" },
          result,
        ) as ListContent;
        return pick(
          renamed,
          "listContentId",
          "listId",
          "mediaId",
          "mediaType",
          "createdAt",
        );
      }
    });
    const formattedResults = renamedResults.map((result) => ({
      ...result,
      type: "listContent" as const,
    }));
    return formattedResults[0];
  } else {
    return null;
  }
}

export async function getListContent(listId: number) {
  const results = await db
    .select()
    .from(listContentTable)
    .where(eq(listContentTable.listId, listId));

  return results;
}

export async function getSavedMovies(listId: number) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const results = await db
      .select({
        mediaId: moviesTable.id,
        listContentId: listContentTable.id,
        title: moviesTable.title,
        posterPath: moviesTable.posterPath,
      })
      .from(moviesTable)
      .innerJoin(listContentTable, eq(listContentTable.movieId, moviesTable.id))
      .where(
        and(
          eq(listContentTable.listId, listId),
          eq(listContentTable.userId, userId),
        ),
      );

    const formattedResults = results.map((result) => ({
      ...result,
      mediaType: "movie" as const,
    }));

    return formattedResults as ListContent[];
  }
}

export async function getSavedSeries(listId: number) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const results = await db
      .select({
        mediaId: tvShowsTable.id,
        listContentId: listContentTable.id,
        title: tvShowsTable.title,
        posterPath: tvShowsTable.posterPath,
      })
      .from(tvShowsTable)
      .innerJoin(
        listContentTable,
        eq(listContentTable.seriesId, tvShowsTable.id),
      )
      .where(
        and(
          eq(listContentTable.listId, listId),
          eq(listContentTable.userId, userId),
        ),
      );

    const formattedResults = results.map((result) => ({
      ...result,
      mediaType: "tv" as const,
    }));

    return formattedResults as ListContent[];
  }
}

export async function removeFromList(
  listContentId: number,
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
          eq(listContentTable.id, listContentId),
          eq(listContentTable.movieId, mediaId),
        ),
      );
  } else if (userId && mediaType === "tv") {
    await db
      .delete(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.id, listContentId),
          eq(listContentTable.seriesId, mediaId),
        ),
      );
  }
}

export async function deleteAllListContent(listId: number) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    await db
      .delete(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.listId, listId),
        ),
      );
  }
}

export async function checkIfSaved(mediaId: number, mediaType: "movie" | "tv") {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    const results = await db
      .select()
      .from(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.movieId, mediaId),
        ),
      );

    const formattedResults = results.map((result) => {
      const renamed = renameKeys(
        { id: "listContentId", movieId: "mediaId" },
        result,
      ) as ListContent;
      return { ...renamed, mediaType: "movie" as const };
    });

    return formattedResults;
  } else if (userId && mediaType === "tv") {
    const results = await db
      .select()
      .from(listContentTable)
      .where(
        and(
          eq(listContentTable.userId, userId),
          eq(listContentTable.seriesId, mediaId),
        ),
      );

    const formattedResults = results.map((result) => {
      const renamed = renameKeys(
        { id: "listContentId", seriesId: "mediaId" },
        result,
      ) as ListContent;
      return { ...renamed, mediaType: "tv" as const };
    });

    return formattedResults;
  }
}
