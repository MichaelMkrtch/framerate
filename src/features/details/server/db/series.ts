"use server";

import { db } from "@/drizzle";
import {
  InsertShow,
  InsertShowReview,
  tvReviewTable,
  tvShowTable,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/features/details/server/db/verifyUser";

// Series Data
export async function createSeries(series: InsertShow) {
  const [result] = await db
    .insert(tvShowTable)
    .values(series)
    .onConflictDoNothing({ target: tvShowTable.id })
    .returning();

  return result;
}

export async function getSeries(seriesId: number) {
  const [result] = await db
    .select()
    .from(tvShowTable)
    .where(eq(tvShowTable.id, seriesId));

  return result;
}

// Series Reviews
export async function createSeriesReview(data: InsertShowReview) {
  const user = await verifyUser();

  if (user && user.id) {
    await db
      .insert(tvReviewTable)
      .values(data)
      .onConflictDoUpdate({
        target: [tvReviewTable.userId, tvReviewTable.seriesId],
        set: { rating: data.rating, updatedAt: new Date() },
      });
  }
}

export async function getSeriesRating(seriesId: number) {
  const user = await verifyUser();

  if (user && user.id) {
    const [result] = await db
      .select({ rating: tvReviewTable.rating })
      .from(tvReviewTable)
      .where(
        and(
          eq(tvReviewTable.userId, user.id),
          eq(tvReviewTable.seriesId, seriesId),
        ),
      );
    return result;
  }
}

export async function deleteSeriesReview(seriesId: number) {
  const user = await verifyUser();

  if (user && user.id) {
    await db
      .delete(tvReviewTable)
      .where(
        and(
          eq(tvReviewTable.userId, user.id),
          eq(tvReviewTable.seriesId, seriesId),
        ),
      );
  }
}

export async function getSeriesList() {
  const user = await verifyUser();

  if (user && user.id) {
    const result = await db
      .select({
        mediaId: tvReviewTable.seriesId,
        title: tvShowTable.title,
        posterPath: tvShowTable.posterPath,
        rating: tvReviewTable.rating,
        createdAt: tvReviewTable.createdAt,
        mediaType: tvReviewTable.mediaType,
      })
      .from(tvShowTable)
      .innerJoin(tvReviewTable, eq(tvShowTable.id, tvReviewTable.seriesId))
      .where(eq(tvReviewTable.userId, user.id));

    return result;
  }
}
