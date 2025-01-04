import { useQuery } from "@tanstack/react-query";

import { fetchRoute } from "@/lib/utils";

export default function useFetchTrending<T extends "movie" | "tv" | "person">(
  filter: T,
  timeWindow: string,
  debouncedQuery?: string,
) {
  const { data, error } = useQuery({
    queryKey: [`${filter}-trending-${timeWindow}`],
    queryFn: () =>
      fetchRoute(
        `/api/trending?filter=${filter}&timeWindow=${timeWindow}`,
        filter,
        "trending",
      ),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !debouncedQuery,
  });

  return { data, error };
}
