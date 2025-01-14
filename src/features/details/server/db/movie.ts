"use server";

import { db } from "@/drizzle";
import {
  InsertMovie,
  InsertMovieReview,
  movieReviewTable,
  movieTable,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/features/details/server/db/verifyUser";

// Movie Data
export async function createMovie(movie: InsertMovie) {
  const [result] = await db
    .insert(movieTable)
    .values(movie)
    .onConflictDoNothing({ target: movieTable.id })
    .returning();

  return result;
}

export async function getMovie(movieId: number) {
  const [result] = await db
    .select()
    .from(movieTable)
    .where(eq(movieTable.id, movieId));

  return result;
}

// Movie Reviews
export async function createMovieReview(data: InsertMovieReview) {
  const user = await verifyUser();

  if (user && user.id) {
    await db
      .insert(movieReviewTable)
      .values(data)
      .onConflictDoUpdate({
        target: [movieReviewTable.userId, movieReviewTable.movieId],
        set: { rating: data.rating, updatedAt: new Date() },
      });
  }
}

export async function getMovieRating(movieId: number) {
  const user = await verifyUser();

  if (user && user.id) {
    const [result] = await db
      .select({ rating: movieReviewTable.rating })
      .from(movieReviewTable)
      .where(
        and(
          eq(movieReviewTable.userId, user.id),
          eq(movieReviewTable.movieId, movieId),
        ),
      );
    return result;
  }
}

export async function deleteMovieReview(movieId: number) {
  const user = await verifyUser();

  if (user && user?.id) {
    await db
      .delete(movieReviewTable)
      .where(
        and(
          eq(movieReviewTable.userId, user.id),
          eq(movieReviewTable.movieId, movieId),
        ),
      );
  }
}

export async function getMovieList() {
  const user = await verifyUser();

  if (user && user.id) {
    const result = await db
      .select({
        mediaId: movieReviewTable.movieId,
        title: movieTable.title,
        posterPath: movieTable.posterPath,
        rating: movieReviewTable.rating,
        createdAt: movieReviewTable.createdAt,
        mediaType: movieReviewTable.mediaType,
      })
      .from(movieTable)
      .innerJoin(movieReviewTable, eq(movieTable.id, movieReviewTable.movieId))
      .where(eq(movieReviewTable.userId, user.id));

    return result;
  }
}
