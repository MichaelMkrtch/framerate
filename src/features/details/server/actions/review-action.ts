"use server";

import type { Details } from "@/types/tmdb.types";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { ratingSchema } from "../../schema/review";
import { createMovieReview } from "../db/movie";
import { createSeriesReview } from "../db/series";

type FormState = {
  status: "success" | "error" | "";
  message: string;
};

export async function review(
  media: Details,
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user)
    return {
      status: "error",
      message: "Please log in to save reviews",
    };

  const formData = Object.fromEntries(data);
  const parsed = ratingSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please select a valid rating",
    };
  }

  const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  if (
    parseFloat(parsed.data.rating) <= 0 ||
    parseFloat(parsed.data.rating) > 5 ||
    !validRatings.includes(parseFloat(parsed.data.rating))
  ) {
    return {
      status: "error",
      message: "Please select a rating between 0.5 and 5",
    };
  }

  try {
    const { rating } = parsed.data;
    const userId = session.user.id;
    const movieId = media.mediaType === "movie" && media.id;
    const seriesId = media.mediaType === "tv" && media.id;

    if (movieId) {
      await createMovieReview({
        userId,
        movieId,
        rating,
        mediaType: "movie",
        liked: false,
        watched: true,
      });
    } else if (seriesId) {
      await createSeriesReview({
        userId,
        seriesId,
        rating,
        mediaType: "tv",
        liked: false,
        watched: true,
      });
    }

    return {
      status: "success",
      message: "Rating added to library",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    throw error;
  }
}
