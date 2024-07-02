"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { InsertMovieReview, movieReviewsTable } from "@/db/schema";

export async function createMovieReview(data: InsertMovieReview) {
  await db
    .insert(movieReviewsTable)
    .values(data)
    .onConflictDoUpdate({
      target: [movieReviewsTable.userId, movieReviewsTable.movieId],
      set: { rating: data.rating },
    });
}

export async function deleteMovieReview(data: {
  userId: number;
  movieId: number;
}) {
  await db
    .delete(movieReviewsTable)
    .where(
      and(
        eq(movieReviewsTable.userId, data.userId),
        eq(movieReviewsTable.movieId, data.movieId),
      ),
    );
}

export async function getMovieRating() {
  const result = db
    .select({ rating: movieReviewsTable.rating })
    .from(movieReviewsTable);
  return result;
}
