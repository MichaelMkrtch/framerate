"use server";

import { listSchema } from "@/components/profile/lists/listSchema";
import { validateRequest } from "@/lib/auth";
import { createList } from "@/lib/lists";

type FormState = {
  status: string;
  message: string;
};

export async function submitList(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const result = await validateRequest();

  if (!result.user) {
    return {
      status: "fail",
      message: "Please log in to save data",
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = listSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "fail",
      message: `Please submit a valid list name: ${formData}`,
    };
  }

  try {
    const { listName: name } = parsed.data;
    const userId = result.user.id;

    await createList({ name, userId });

    return {
      status: "success",
      message: "List created",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "fail",
        message: error.message,
      };
    }
    console.log(error);
    throw error;
  }
}
