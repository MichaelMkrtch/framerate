"use server";

import { redirect } from "next/navigation";

import {
  loginFormSchema,
  signupFormSchema,
} from "@/components/home/formSchema";
import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";

type FormState = {
  status: string;
  message: string;
};

export async function signup(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = signupFormSchema.safeParse(formData);

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
      message:
        "Please remove instances of 'support' or 'admin' from username or name fields",
    };
  }

  if (!/^\w+( \w+)*$/.test(parsed.data.name)) {
    return {
      status: "fail",
      message:
        "Special characters, numbers, and excess spaces are not allowed in the name field.",
    };
  }

  if (!/^[a-z0-9_-]+$/.test(parsed.data.username)) {
    return {
      status: "fail",
      message:
        "Special or uppercase characters are not allowed in the username field",
    };
  }

  const { name, email, username, password } = parsed.data;

  const hashedPassword = hashUserPassword(password);

  try {
    const id = await createUser({
      email,
      name,
      username,
      password: hashedPassword,
    });

    await createAuthSession(id);
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
  } finally {
    redirect("/");
  }
}

export async function login(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = loginFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "fail",
      message: "Please fill all fields correctly",
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || existingUser.length === 0) {
    return {
      status: "fail",
      message: "Could not authenticate user. Please check your credentials",
    };
  }

  const isValidPassword = verifyPassword(existingUser[0].password, password);

  if (!isValidPassword) {
    return {
      status: "fail",
      message: "Could not authenticate user. Please check your credentials",
    };
  }

  await createAuthSession(existingUser[0].id);
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
