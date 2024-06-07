import { useQuery } from "@tanstack/react-query";

import { type Film } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

export default function useFetchTrending(
  timeWindow: string,
  debouncedQuery?: string,
) {
  const { data } = useQuery({
    queryKey: ["trending", timeWindow],
    queryFn: () => fetchRoute(`/api/trending?timeWindow=${timeWindow}`),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !debouncedQuery,
  });

  const trendingData: Film[] = data;

  return trendingData;
}
