"use server";

import { and, avg, count, eq } from "drizzle-orm";

import { type Review } from "@/types";

import { validateRequest } from "./auth";

import { db } from "@/db";
import { InsertShowReview, tvReviewsTable, tvShowsTable } from "@/db/schema";

type Data = {
  seriesId: number;
};

async function validUser() {
  const result = await validateRequest();
  return result;
}

export async function createSeriesReview(data: InsertShowReview) {
  await db
    .insert(tvReviewsTable)
    .values(data)
    .onConflictDoUpdate({
      target: [tvReviewsTable.userId, tvReviewsTable.seriesId],
      set: { rating: data.rating },
    });
}

export async function deleteSeriesReview(data: Data) {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    await db
      .delete(tvReviewsTable)
      .where(
        and(
          eq(tvReviewsTable.userId, userId),
          eq(tvReviewsTable.seriesId, data.seriesId),
        ),
      );
  }
}

export async function getSeriesRating(data: Data) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const result = db
      .select({ rating: tvReviewsTable.rating })
      .from(tvReviewsTable)
      .where(
        and(
          eq(tvReviewsTable.userId, userId),
          eq(tvReviewsTable.seriesId, data.seriesId),
        ),
      );
    return result;
  }
}

export async function getSeries() {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    const result = await db
      .select({
        mediaId: tvReviewsTable.seriesId,
        title: tvShowsTable.title,
        posterPath: tvShowsTable.posterPath,
        rating: tvReviewsTable.rating,
        createdAt: tvReviewsTable.createdAt,
        mediaType: tvReviewsTable.mediaType,
      })
      .from(tvShowsTable)
      .innerJoin(tvReviewsTable, eq(tvShowsTable.id, tvReviewsTable.seriesId))
      .where(eq(tvReviewsTable.userId, userId));

    return result as Review[];
  }
}
