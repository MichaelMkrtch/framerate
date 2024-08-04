"use server";

import { type FormState, type ListData } from "@/types";

import {
  listSchema,
  selectListSchema,
} from "@/components/profile/lists/listSchema";
import { validateRequest } from "@/lib/auth";
import { addToList, createList } from "@/lib/lists";

export async function submitList(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const result = await validateRequest();

  if (!result.user) {
    return {
      status: "fail",
      message: "Please log in to save data",
      data: null,
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = listSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: "fail",
      message: "Please submit a valid list name",
      data: null,
    };
  }

  try {
    const { listName: name } = parsed.data;
    const userId = result.user.id;

    const listResult = await createList({ name, userId });

    return {
      status: "success",
      message: "List created",
      data: listResult,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "fail",
        message: error.message,
        data: null,
      };
    }
    console.log(error);
    throw error;
  }
}

export async function saveToList(
  listContent: {
    mediaId: number;
    mediaType: "movie" | "tv";
  },
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const result = await validateRequest();

  if (!result.user) {
    return {
      status: "fail",
      message: "Please log in to save data",
      data: null,
    };
  }

  try {
    const { mediaId, mediaType } = listContent;
    const userId = result.user.id;
    const formData = Object.fromEntries(data);
    const parsed = selectListSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        status: "fail",
        message: "Please select a valid list",
        data: null,
      };
    }

    const listIdStr = parsed.data.listId;
    const listId = parseFloat(listIdStr);

    let mediaResult: ListData<"listContent">;

    if (mediaType === "movie") {
      mediaResult = await addToList({
        userId,
        listId,
        mediaType,
        movieId: mediaId,
      });
    } else {
      mediaResult = await addToList({
        userId,
        listId,
        mediaType,
        seriesId: mediaId,
      });
    }

    return {
      status: "success",
      message: "Updated list",
      data: mediaResult,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "fail",
        message: error.message,
        data: null,
      };
    }
    console.log(error);
    throw error;
  }
}
