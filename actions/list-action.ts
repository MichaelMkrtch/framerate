"use server";

import { type FormState, type ListData, SavedMedia } from "@/types";

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
    idList: number[];
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
    const { mediaId, mediaType, idList } = listContent;
    const userId = result.user.id;
    const formData = Object.fromEntries(data);
    const parsed = selectListSchema.safeParse(formData);

    const listIdsString = (parsed.data && Object.values(parsed.data)) || [];
    const listIdsNum = listIdsString.map((id) => parseFloat(id));
    console.log(idList)

    const contentToAdd = idList.map((id) => {
      if (mediaType === "movie") {
        return {
          userId,
          listId: id,
          mediaType,
          movieId: mediaId,
        };
      } else {
        return {
          userId,
          listId: id,
          mediaType,
          seriesId: mediaId,
        };
      }
    });

    const mediaResults = await addToList(contentToAdd);

    // if (listIds && mediaType === "tv") {
    //   listIds.forEach(async (listId) => {
    //     const listIdNum = parseFloat(listId);
    //     const result = await addToList({
    //       userId,
    //       listId: listIdNum,
    //       mediaType,
    //       seriesId: mediaId,
    //     });

    //     return {
    //       status: "success",
    //       message: "Updated list",
    //       data: result,
    //     };
    //   });
    // }

    return {
      status: "success",
      message: mediaResults.length === 1 ? "Updated list" : "Updated lists",
      data: mediaResults,
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
