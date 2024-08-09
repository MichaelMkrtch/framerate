"use server";

import { and, avg, count, eq } from "drizzle-orm";

import { type Review } from "@/types";

import { validateRequest } from "./auth";

import { db } from "@/db";
import { InsertMovieReview, movieReviewsTable, moviesTable } from "@/db/schema";

export async function validUser() {
  const result = await validateRequest();
  return result;
}

export async function createMovieReview(data: InsertMovieReview) {
  await db
    .insert(movieReviewsTable)
    .values(data)
    .onConflictDoUpdate({
      target: [movieReviewsTable.userId, movieReviewsTable.movieId],
      set: { rating: data.rating },
    });
}

export async function deleteMovieReview(movieId: number) {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    await db
      .delete(movieReviewsTable)
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, movieId),
        ),
      );
  }
}

export async function getMovieRating(movieId: number) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const result = await db
      .select({ rating: movieReviewsTable.rating })
      .from(movieReviewsTable)
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, movieId),
        ),
      );
    return result;
  }
}

export async function getAvgMovieRating(movieId: number) {
  const result = await db
    .select({
      avgRating: avg(movieReviewsTable.rating).mapWith(Number),
      reviewCount: count(movieReviewsTable.rating),
    })
    .from(movieReviewsTable)
    .where(eq(movieReviewsTable.movieId, movieId));

  return result;
}

export async function getMovies() {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    const result = await db
      .select({
        mediaId: movieReviewsTable.movieId,
        title: moviesTable.title,
        posterPath: moviesTable.posterPath,
        rating: movieReviewsTable.rating,
        createdAt: movieReviewsTable.createdAt,
        mediaType: movieReviewsTable.mediaType,
      })
      .from(moviesTable)
      .innerJoin(
        movieReviewsTable,
        eq(moviesTable.id, movieReviewsTable.movieId),
      )
      .where(eq(movieReviewsTable.userId, userId));

    return result as Review[];
  }
}
