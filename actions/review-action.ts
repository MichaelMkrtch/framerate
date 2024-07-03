"use server";

import { type Film } from "@/types";

import { movieRatingSchema } from "@/components/details/reviewSchema";
import { validateRequest } from "@/lib/auth";
import { createMovieReview } from "@/lib/review";

type FormState = {
  status: string;
  message: string;
};

export async function review(
  filmData: Film,
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const result = await validateRequest();

  if (!result.user) {
    return {
      status: "fail",
      message: "Please log in to save reviews",
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = movieRatingSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "fail",
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
      status: "fail",
      message: "Please select a rating between 0.5 and 5",
    };
  }

  try {
    const { rating } = parsed.data;
    const userId = result.user.id;
    const movieId = filmData.id;

    await createMovieReview({ userId, movieId, rating });

    return {
      status: "success",
      message: "Rating added to library",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "fail",
        message: error.message,
      };
    }
    console.log(error);
    throw error;
  }
}
