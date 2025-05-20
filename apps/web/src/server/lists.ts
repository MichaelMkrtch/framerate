import type { List } from "@web/types/lists";

import { client } from "./client-instance";

type InsertListItem = {
  listId: number;
  mediaType: "movie" | "tv";
  mediaId: number;
};

type ListUpdates = {
  name: string;
};

const listsRoute = client.api.v1.lists;
const listItemsRoute = client.api.v1["list-items"];

export async function createList(listName: string) {
  const { data, error } = await listsRoute.post({ listName });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data as List;
}

export async function getLists() {
  const { data, error } = await listsRoute.get();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function updateList(listId: number, updates: ListUpdates) {
  const { data, error } = await listsRoute({ listId }).patch({
    listName: updates.name,
  });

  if (error) {
    throw new Error("Something went wrong while updating list!");
  }

  return data;
}

export async function deleteList(listId: number) {
  const { data, error } = await listsRoute({ listId }).delete();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function getListData(username: string, slug: string) {
  const { data, error } = await client.api.v1
    .user({ username })
    .lists({ slug })
    .get();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function addListItem(data: InsertListItem) {
  const { data: listItems, error } = await listItemsRoute.post(data);

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return listItems;
}

export async function getListItem(mediaType: "movie" | "tv", mediaId: number) {
  const { data, error } = await listItemsRoute.get({
    query: { mediaType, mediaId },
  });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function deleteListItem(id: number) {
  const { data, error } = await listItemsRoute({ id }).delete();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}
