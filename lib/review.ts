"use server";

import { and, eq } from "drizzle-orm";

import { validateRequest } from "./auth";

import { db } from "@/db";
import { InsertMovieReview, movieReviewsTable, moviesTable } from "@/db/schema";

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

export async function deleteMovieReview(data: { movieId: number }) {
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

export async function getMovieRating(data: { movieId: number }) {
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

export async function getMovies() {
  const result = await validUser();
  const userId = result.user?.id;

  if (userId) {
    const result = db
      .select({
        id: movieReviewsTable.movieId,
        title: moviesTable.title,
        poster_path: moviesTable.posterPath,
        rating: movieReviewsTable.rating,
        createdAt: movieReviewsTable.createdAt,
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
