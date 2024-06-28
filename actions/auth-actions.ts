"use server";

import { redirect } from "next/navigation";

import { formSchema } from "@/components/home/formSchema";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

type FormState = {
  status: string;
  message: string;
};

export async function signup(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "fail",
      message: "Please fill all fields correctly",
    };
  }

  if (
    parsed.data.name.toLowerCase().includes("support") ||
    parsed.data.name.toLowerCase().includes("admin") ||
    parsed.data.username.toLowerCase().includes("support") ||
    parsed.data.username.toLowerCase().includes("admin")
  ) {
    return {
      status: "fail",
      message: "Please remove instances of 'support' or 'admin'",
    };
  }

  const { name, email, username, password } = parsed.data;

  const hashedPassword = hashUserPassword(password);

  try {
    await createUser({ email, name, username, password: hashedPassword });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("email")) {
        return {
          status: "fail",
          message: "An account already exists with this email",
        };
      }
      if (error.message.includes("username")) {
        return { status: "fail", message: "This username is already taken" };
      }
    }
    console.log(error);
    throw error;
  }

  redirect("/library");
}
