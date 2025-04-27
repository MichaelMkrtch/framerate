import { z } from "zod";

export const listSchema = z.object({
  listName: z
    .string()
    .trim()
    .min(1, { message: "Collection name must be at least 1 character." })
    .max(100, { message: "Collection name must be at most 100 characters." }),
});
