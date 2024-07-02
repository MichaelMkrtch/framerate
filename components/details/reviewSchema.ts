import { z } from "zod";

export const movieRatingSchema = z.object({
  rating: z.string().trim(),
});
