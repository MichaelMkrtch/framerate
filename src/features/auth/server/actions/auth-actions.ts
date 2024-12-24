"use server";

import { z } from "zod";

import { signupSchema } from "@/features/auth/schemas/auth-forms";
import { blacklistFilter } from "@/features/auth/server/blacklistFilter";

type FilterResult = {
  status: "success" | "error" | "";
  message: string;
  errors?: { [key: string]: string[] };
};

export async function blacklistChecks(
  unsafeData: z.infer<typeof signupSchema>,
): Promise<FilterResult> {
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

  console.log(parsedData);

  const { name, username } = parsedData;

  const [nameFilterResult, usernameFilterResult] = blacklistFilter(
    name,
    username,
  );

  if (
    nameFilterResult.hasBlacklistTerm ||
    usernameFilterResult.hasBlacklistTerm
  ) {
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
