import { z } from "zod";

export const formSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address." }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name must be at least 1 character." })
    .max(50, { message: "Name must be at most 50 characters." }),
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(15, { message: "Username must be at most 15 characters. " }),
  password: z
    .string()
    .trim()
    .min(10, { message: "Password must be at least 10 characters." })
    .max(30, { message: "Password must be at most 30 characters." }),
});
