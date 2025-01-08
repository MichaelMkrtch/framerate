"use server";

import { headers } from "next/headers";

import { db } from "@/drizzle";
import { movieReviewTable, tvReviewTable } from "@/drizzle/schema";
import { and, avg, count, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

async function verifyUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user;
}

// Written reviews
export async function getReview(mediaType: "movie" | "tv", mediaId: number) {
  const user = await verifyUser();

  if (user?.id && mediaType === "movie") {
    const [result] = await db
      .select({
        liked: movieReviewTable.liked,
        watched: movieReviewTable.watched,
        review: movieReviewTable.review,
      })
      .from(movieReviewTable)
      .where(
        and(
          eq(movieReviewTable.userId, user.id),
          eq(movieReviewTable.movieId, mediaId),
        ),
      );

    return result;
  } else if (user?.id && mediaType === "tv") {
    const [result] = await db
      .select({
        liked: tvReviewTable.liked,
        watched: tvReviewTable.watched,
        review: tvReviewTable.review,
      })
      .from(tvReviewTable)
      .where(
        and(
          eq(tvReviewTable.userId, user.id),
          eq(tvReviewTable.seriesId, mediaId),
        ),
      );

    return result;
  }
}

export async function getAvgRating(mediaType: "movie" | "tv", mediaId: number) {
  if (mediaType === "movie") {
    const [result] = await db
      .select({
        avgRating: avg(movieReviewTable.rating).mapWith(Number),
        reviewCount: count(movieReviewTable.rating),
      })
      .from(movieReviewTable)
      .where(eq(movieReviewTable.movieId, mediaId));

    return result;
  } else {
    const [result] = await db
      .select({
        avgRating: avg(tvReviewTable.rating).mapWith(Number),
        reviewCount: count(tvReviewTable.rating),
      })
      .from(tvReviewTable)
      .where(eq(tvReviewTable.seriesId, mediaId));

    return result;
  }
}

type ReviewData = {
  status: boolean;
  mediaId: number;
  mediaType: string;
};

export async function updateLikeStatus({
  status,
  mediaId,
  mediaType,
}: ReviewData) {
  const user = await verifyUser();

  if (user?.id && mediaType === "movie") {
    await db
      .update(movieReviewTable)
      .set({ liked: status })
      .where(
        and(
          eq(movieReviewTable.userId, user.id),
          eq(movieReviewTable.movieId, mediaId),
        ),
      );
  } else if (user?.id && mediaType === "tv") {
    await db
      .update(tvReviewTable)
      .set({ liked: status })
      .where(
        and(
          eq(tvReviewTable.userId, user.id),
          eq(tvReviewTable.seriesId, mediaId),
        ),
      );
  }
}

export async function updateWatchStatus({
  status,
  mediaId,
  mediaType,
}: ReviewData) {
  const user = await verifyUser();

  if (user?.id && mediaType === "movie") {
    await db
      .update(movieReviewTable)
      .set({ watched: status })
      .where(
        and(
          eq(movieReviewTable.userId, user.id),
          eq(movieReviewTable.movieId, mediaId),
        ),
      );
  } else if (user?.id && mediaType === "tv") {
    await db
      .update(tvReviewTable)
      .set({ watched: status })
      .where(
        and(
          eq(tvReviewTable.userId, user.id),
          eq(tvReviewTable.seriesId, mediaId),
        ),
      );
  }
}
