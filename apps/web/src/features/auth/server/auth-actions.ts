import { signupSchema } from "@/features/auth/schema/auth-forms";

import { blacklistFilter } from "./blacklistFilters";
import { z } from "zod";

export function blacklistChecks(unsafeData: z.infer<typeof signupSchema>) {
  const {
    success,
    data: parsedData,
    error: parsedError,
  } = signupSchema.safeParse(unsafeData);

  if (!success) {
    return {
      status: "error",
      message: "Please fill all fields correctly",
      errors: parsedError.flatten().fieldErrors,
    };
  }

  const blacklistMatches = [];

  for (const [key, value] of Object.entries(parsedData)) {
    const hasMatch = blacklistFilter(value);
    blacklistMatches.push(hasMatch);
  }

  if (blacklistMatches.includes(false)) {
    return {
      status: "error",
      message: "Please don't use profanity or impersonate FrameRate staff",
    };
  }

  return {
    status: "success",
    message: "Passed checks",
  };
}
