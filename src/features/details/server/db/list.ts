"use server";

import { db } from "@/drizzle";
import { listItemTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/features/details/server/db/verifyUser";

// Checks if media is saved to any list by user
export async function checkIfListItem(
  mediaId: number,
  mediaType: "movie" | "tv",
) {
  const user = await verifyUser();

  if (user?.id && mediaType === "movie") {
    const result = await db
      .select({
        listId: listItemTable.listId,
        mediaType: listItemTable.mediaType,
        mediaId: listItemTable.movieId,
      })
      .from(listItemTable)
      .where(
        and(
          eq(listItemTable.userId, user.id),
          eq(listItemTable.movieId, mediaId),
        ),
      );

    return result;
  } else if (user?.id && mediaType === "tv") {
    const result = await db
      .select({
        listId: listItemTable.listId,
        mediaType: listItemTable.mediaType,
        mediaId: listItemTable.seriesId,
      })
      .from(listItemTable)
      .where(
        and(
          eq(listItemTable.userId, user.id),
          eq(listItemTable.seriesId, mediaId),
        ),
      );

    return result;
  }

  return null;
}
