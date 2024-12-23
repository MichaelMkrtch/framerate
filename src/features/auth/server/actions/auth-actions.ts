"use server";

import { signupSchema } from "@/features/auth/schemas/auth-forms";

type FormState = {
  status: "success" | "error" | "";
  message: string;
  errors?: { [key: string]: string[] };
};

export async function signup(
  prevData: FormState,
  unsafeData: FormData,
): Promise<FormState> {
  const unsafeDataObj = Object.fromEntries(unsafeData);
  const { success, data, error } = signupSchema.safeParse(unsafeDataObj);

  if (!success) {
    return {
      status: "error",
      message: "Please fill all fields correctly",
      errors: error.flatten().fieldErrors,
    };
  }

  console.log(data);

  // const { name, email, username, password } = data;

  // if (
  //   name.toLowerCase().includes("support") ||
  //   name.toLowerCase().includes("admin") ||
  //   username.toLowerCase().includes("support") ||
  //   username.toLowerCase().includes("admin") ||
  //   name.toLowerCase().includes("framerate") ||
  //   username.toLowerCase().includes("framerate") ||
  //   name.toLowerCase().includes("frame rate") ||
  //   username.toLowerCase().includes("frame rate")
  // ) {
  //   return {
  //     status: "error",
  //     message:
  //       "Please remove instances of 'support' or 'admin' from username or name fields",
  //   };
  // }

  return {
    status: "success",
    message: "Account created successfully!",
  };
}
