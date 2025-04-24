import type { App } from "@server/index";
import type { Trending } from "@web/types/tmdb-types";

import { treaty } from "@elysiajs/eden";

type FetchTrendingParams<T> = {
  filter: T;
  timeWindow: "day" | "week";
};

const client = treaty<App>("localhost:8000");

export async function fetchTrending<
  T extends "all" | "movie" | "tv" | "person",
>({ filter, timeWindow }: FetchTrendingParams<T>) {
  const trendingRoute = client.api.v1.trending.index;

  const { data: trending, error } = await trendingRoute.get({
    query: { filter, timeWindow },
  });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return trending as Trending<T>[];
}
