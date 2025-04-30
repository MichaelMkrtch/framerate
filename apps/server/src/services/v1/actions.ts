import { db } from "@server/drizzle";
import { getTables } from "@server/lib/utils";
import { and, eq } from "drizzle-orm";

type ReviewData = {
  userId: string;
  mediaType: "movie" | "tv";
  mediaId: number;
  field: "liked" | "watched";
  value: boolean;
};

/**
 * Updates a user's review for a specific movie or series.
 *
 * If a review exists, it will be updated. If no review exists, request is ignored.
 *
 * @param param - Object containing the user ID, media type, media ID,
 *                 the review field to update, and the new value to set.
 * @returns The updated review object
 */
export async function updateReview({
  userId,
  field,
  value,
  mediaId,
  mediaType,
}: ReviewData) {
  const tablesMap = getTables();
  const { table, idCol } = tablesMap[mediaType];

  const result = await db
    .update(table)
    .set({ [field]: value, updatedAt: new Date() })
    .where(and(eq(table.userId, userId), eq(idCol, mediaId)))
    .returning();

  return result;
}
