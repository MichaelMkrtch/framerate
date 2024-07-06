import { useQuery } from "@tanstack/react-query";

import { type Media } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

export default function useFetchTrending(
  type: string,
  timeWindow: string,
  debouncedQuery?: string,
) {
  const { data } = useQuery({
    queryKey: [`${type}-trending-${timeWindow}`],
    queryFn: () =>
      fetchRoute(`/api/trending?type=${type}&timeWindow=${timeWindow}`),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    enabled: !debouncedQuery,
  });

  const trendingData: Media[] = data;

  return trendingData;
}
