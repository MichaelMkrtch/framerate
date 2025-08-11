import type { Trending } from '@/types/trending';

import { client } from './client-instance';

type GetTrendingParams<T> = {
  filter: T;
  timeWindow: 'day' | 'week';
};

export async function getTrending<T extends 'all' | 'movie' | 'tv' | 'person'>({
  filter,
  timeWindow,
}: GetTrendingParams<T>) {
  const { data: trending, error } = await client.api.v1.trending.get({
    query: { filter, timeWindow },
  });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return trending as Trending<T>[];
}
