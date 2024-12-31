import type { Trending } from "@/types/tmdb.types";

import { useQuery } from "@tanstack/react-query";

import fetchRoute from "@/lib/utils";

export default function useFetchTrending(
  filter: string,
  timeWindow: string,
  debouncedQuery?: string,
) {
  const { data, error } = useQuery({
    queryKey: [`${filter}-trending-${timeWindow}`],
    queryFn: () =>
      fetchRoute<Trending[]>(
        `/api/trending?filter=${filter}&timeWindow=${timeWindow}`,
      ),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !debouncedQuery,
  });

  return { data, error };
}
