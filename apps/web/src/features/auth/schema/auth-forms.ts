import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name must be at least 1 character" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[^+\-*/=^%&<>!@#,$(){}[\]]*$/, {
      message: "First name cannot contain special characters",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name must be at least 1 character" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[^+\-*/=^%&<>!@#,$(){}[\]]*$/, {
      message: "Last name cannot contain special characters",
    }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username must be at least 1 character" })
    .max(15, { message: "Username must be less than 15 characters" })
    .regex(/[a-zA-Z]/, {
      message: "Username must contain at least 1 letter",
    })
    .regex(/^[A-Za-z].*$/, {
      message: "Username must start with a letter",
    })
    .regex(/^[A-Za-z][A-Za-z0-9]*$/, {
      message: "Username cannot contain special characters",
    })
    .refine((s) => !s.includes(" "), "Spaces are not allowed in usernames"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),
});
