import { z } from "zod";

// const stringToNumber = z
//   .string()
//   .trim()
//   .transform((value) => {
//     const parsed = parseInt(value, 10);
//     if (isNaN(parsed)) {
//       throw new Error("Invalid ID: must be a number");
//     }
//     return parsed;
//   });

export const listSchema = z.object({
  listName: z
    .string()
    .trim()
    .min(1, { message: "Collection name must be at least 1 character." })
    .max(100, { message: "Collection name must be at most 100 characters." }),
});

export const listItemSchema = z.object({
  listId: z.number().int().positive().min(1),
  mediaType: z.enum(["movie", "tv"]),
  mediaId: z.number().int().positive().min(1),
});
