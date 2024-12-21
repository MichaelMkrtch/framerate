import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name must be at least 1 character" })
    .max(50, { message: "Name must be less than 50 characters" }),
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(15, { message: "Username must be less than 15 characters" })
    .toLowerCase()
    .refine((s) => !s.includes(" "), "Spaces are not allowed in usernames"),
  password: z
    .string()
    .trim()
    .min(10, { message: "Password must be at least 10 characters" })
    .max(30, { message: "Password must be less than 30 characters" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .refine((s) => !s.includes(" "), "Spaces are not allowed in passwords"),
});
