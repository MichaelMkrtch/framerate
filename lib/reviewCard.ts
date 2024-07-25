"use server";

import { and, eq } from "drizzle-orm";

import { validUser } from "./movieReview";

import { db } from "@/db";
import { movieReviewsTable, tvReviewsTable } from "@/db/schema";

export async function getReview(mediaId: number, mediaType: string) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    const result = await db
      .select({
        liked: movieReviewsTable.liked,
        watched: movieReviewsTable.watched,
        review: movieReviewsTable.review,
      })
      .from(movieReviewsTable)
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, mediaId),
        ),
      );

    return result[0];
  } else if (userId && mediaType === "tv") {
    const result = await db
      .select({
        liked: tvReviewsTable.liked,
        watched: tvReviewsTable.watched,
        review: tvReviewsTable.review,
      })
      .from(tvReviewsTable)
      .where(
        and(
          eq(tvReviewsTable.userId, userId),
          eq(tvReviewsTable.seriesId, mediaId),
        ),
      );

    return result[0];
  }
}

type ReviewData = {
  status: true | null;
  userId: number;
  mediaId: number;
  mediaType: string;
};

export async function updateLikeStatus({
  status,
  userId,
  mediaId,
  mediaType,
}: ReviewData) {
  if (mediaType === "movie") {
    await db
      .update(movieReviewsTable)
      .set({ liked: status })
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, mediaId),
        ),
      );
  } else {
    await db
      .update(tvReviewsTable)
      .set({ liked: status })
      .where(
        and(
          eq(tvReviewsTable.userId, userId),
          eq(tvReviewsTable.seriesId, mediaId),
        ),
      );
  }
}

export async function updateWatchStatus({
  status,
  userId,
  mediaId,
  mediaType,
}: ReviewData) {
  if (mediaType === "movie") {
    await db
      .update(movieReviewsTable)
      .set({ watched: status })
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, mediaId),
        ),
      );
  } else {
    await db
      .update(tvReviewsTable)
      .set({ watched: status })
      .where(
        and(
          eq(tvReviewsTable.userId, userId),
          eq(tvReviewsTable.seriesId, mediaId),
        ),
      );
  }
}
