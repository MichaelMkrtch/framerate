import type { MediaDetails } from "@web/types/details";

import { client } from "./client-instance";

export async function getDetails<T extends "movie" | "tv">(
  mediaType: T,
  id: string,
) {
  const detailsRoute = client.api.v1.details({ type: mediaType })({ id }).index;

  const { data: details, error } = await detailsRoute.get();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return details as MediaDetails<T>;
}
