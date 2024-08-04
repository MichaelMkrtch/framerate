import { z } from "zod";

export const listSchema = z.object({
  listName: z
    .string()
    .trim()
    .min(1, { message: "List name must be at least 1 character." })
    .max(150, { message: "List name must be at most 150 characters." }),
});

export const selectListSchema = z.object({
  listId: z.string().trim(),
});
