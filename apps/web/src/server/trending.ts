import type { Trending } from "@web/types/trending";

import { client } from "./client-instance";

type GetTrendingParams<T> = {
  filter: T;
  timeWindow: "day" | "week";
};

export async function getTrending<T extends "all" | "movie" | "tv" | "person">({
  filter,
  timeWindow,
}: GetTrendingParams<T>) {
  const trendingRoute = client.api.v1.trending.index;

  const { data: trending, error } = await trendingRoute.get({
    query: { filter, timeWindow },
  });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return trending as Trending<T>[];
}
