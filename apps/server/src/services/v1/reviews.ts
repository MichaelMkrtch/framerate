import { db } from "@server/drizzle";
import { getReviewTables } from "@server/lib/utils";
import { validateRating } from "@server/lib/validate-rating";
import { and, avg, count, eq } from "drizzle-orm";

/**
 * Gets user's review for specific media from database
 * @param userId - The user who made the review
 * @param mediaType - The media type to look for (movie or tv)
 * @param mediaId - The media ID to look for
 * @returns An object containing the review data or undefined if it does not exist
 */
export async function getReview(
  userId: string,
  mediaType: "movie" | "tv",
  mediaId: number,
) {
  const tablesMap = getReviewTables();
  const { table, idCol } = tablesMap[mediaType];

  const [result] = await db
    .select({
      liked: table.liked,
      watched: table.watched,
      review: table.review,
      rating: table.rating,
    })
    .from(table)
    .where(and(eq(table.userId, userId), eq(idCol, mediaId)));

  return result;
}

/**
 * Gets the average rating and total rating count for some media
 * @param mediaType - "movie" or "tv"
 * @param mediaId - The numeric ID of the media
 * @returns An object with
 *   - avgRating  (number|null): null if there are no reviews
 *   - reviewCount (number)
 */
export async function getAvgRating(mediaType: "movie" | "tv", mediaId: number) {
  const tablesMap = getReviewTables();
  const { table, idCol } = tablesMap[mediaType];

  const [result] = await db
    .select({
      avgRating: avg(table.rating).mapWith(Number),
      reviewCount: count(table.rating).mapWith(Number),
    })
    .from(table)
    .where(eq(idCol, mediaId));

  return {
    avgRating: result?.avgRating ?? null,
    reviewCount: result?.reviewCount ?? 0,
  };
}

type AddReview = {
  userId: string;
  mediaType: "movie" | "tv";
  mediaId: number;
  rating: string;
};

/**
 * Adds a movie or tv review to the database
 *
 * @param data - Object containing the userID, media type, media ID, and rating
 *
 * @returns The newly added review or undefined if it failed
 */
export async function addReview(data: AddReview) {
  const tablesMap = getReviewTables();
  const { table, idCol, idColName } = tablesMap[data.mediaType];

  const { userId, mediaType, mediaId, rating } = data;

  const error = validateRating(rating);

  if (error) {
    throw new Error(error);
  }

  const [result] = await db
    .insert(table)
    .values({
      userId,
      mediaType,
      [idColName]: mediaId,
      rating,
      liked: false,
      watched: true,
      review: null,
    })
    .onConflictDoUpdate({
      target: [table.userId, idCol],
      set: { rating: data.rating, updatedAt: new Date() },
    })
    .returning();

  return result;
}

/**
 * Deletes a review for a specific media type and ID that belongs to the active user
 *
 * @param mediaId - media for which to find a review
 * @param mediaType - type of the media reviewed
 *
 * @returns The deleted review object or undefined if no review existed
 */
export async function deleteReview(
  userId: string,
  mediaId: number,
  mediaType: "movie" | "tv",
) {
  const tablesMap = getReviewTables();
  const { table, idCol } = tablesMap[mediaType];

  const [result] = await db
    .delete(table)
    .where(
      and(
        eq(table.userId, userId),
        eq(table.mediaType, mediaType),
        eq(idCol, mediaId),
      ),
    )
    .returning();

  return result;
}
