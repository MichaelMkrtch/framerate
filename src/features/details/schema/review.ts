import { z } from 'zod';

export const ratingSchema = z.object({
  rating: z.string().trim(),
});
