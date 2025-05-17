import { client } from "./client-instance";

const actionsRoute = client.api.v1.actions;

type ReviewData = {
  mediaType: "movie" | "tv";
  mediaId: number;
  field: "liked" | "watched";
  value: boolean;
};

export async function updateReview({
  mediaType,
  mediaId,
  field,
  value,
}: ReviewData) {
  const { data, error } = await actionsRoute.media.patch({
    mediaType,
    mediaId,
    field,
    value,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function addListAction(listId: number, field: "like" | "save") {
  const { data, error } = await actionsRoute.lists.put({ listId, field });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteListAction(listId: number, field: "like" | "save") {
  const { data, error } = await actionsRoute.lists.delete(null, {
    query: { listId, field },
  });

  if (error) {
    throw error;
  }

  return data;
}
