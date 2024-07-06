"use server";

import { and, avg, count, eq } from "drizzle-orm";

import { validateRequest } from "./auth";

import { db } from "@/db";
import { InsertMovieReview, movieReviewsTable, moviesTable } from "@/db/schema";

type Data = {
  movieId: number;
};

async function validUser() {
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

export async function deleteMovieReview(data: Data) {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    await db
      .delete(movieReviewsTable)
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, data.movieId),
        ),
      );
  }
}

export async function getMovieRating(data: Data) {
  const userResult = await validUser();
  const userId = userResult.user?.id;

  if (userId) {
    const result = db
      .select({ rating: movieReviewsTable.rating })
      .from(movieReviewsTable)
      .where(
        and(
          eq(movieReviewsTable.userId, userId),
          eq(movieReviewsTable.movieId, data.movieId),
        ),
      );
    return result;
  }
}

export async function getAvgMovieRating(data: Data) {
  const result = db
    .select({
      avgRating: avg(movieReviewsTable.rating).mapWith(Number),
      reviewCount: count(movieReviewsTable.rating),
    })
    .from(movieReviewsTable)
    .where(eq(movieReviewsTable.movieId, data.movieId));

  return result;
}

export async function getMovies() {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    const result = db
      .select({
        id: movieReviewsTable.movieId,
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

    return result;
  }
}
