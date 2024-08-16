"use server";

import { and, avg, count, eq } from "drizzle-orm";

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

export async function getAvgRating(mediaType: "movie" | "tv", mediaId: number) {
  if (mediaType === "movie") {
    const result = await db
      .select({
        avgRating: avg(movieReviewsTable.rating).mapWith(Number),
        reviewCount: count(movieReviewsTable.rating),
      })
      .from(movieReviewsTable)
      .where(eq(movieReviewsTable.movieId, mediaId));

    return result;
  } else {
    const result = db
      .select({
        avgRating: avg(tvReviewsTable.rating).mapWith(Number),
        reviewCount: count(tvReviewsTable.rating),
      })
      .from(tvReviewsTable)
      .where(eq(tvReviewsTable.seriesId, mediaId));

    return result;
  }
}

type ReviewData = {
  status: true | null;
  mediaId: number;
  mediaType: string;
};

export async function updateLikeStatus({
  status,
  mediaId,
  mediaType,
}: ReviewData) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    await db
      .update(movieReviewsTable)
      .set({ liked: status })
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, mediaId),
        ),
      );
  } else if (userId && mediaType === "tv") {
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
  mediaId,
  mediaType,
}: ReviewData) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId && mediaType === "movie") {
    await db
      .update(movieReviewsTable)
      .set({ watched: status })
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, mediaId),
        ),
      );
  } else if (userId && mediaType === "tv") {
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
