import { useQueries } from "@tanstack/react-query";

import { Media } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

export default function useFetchDetails(
  fetchList: { mediaType: "movie" | "tv"; id: number }[],
) {
  const detailsResults: Media[] = [];

  const detailsQuery = useQueries({
    queries: fetchList.map((item) => ({
      queryKey: [`${item.mediaType}-details`, item.id],
      queryFn: () =>
        fetchRoute(`/api/details?type=${item.mediaType}&id=${item.id}`),
      staleTime: 1000 * 60 * 2,
      enabled: fetchList.length > 0,
    })),
  });

  if (detailsQuery) {
    detailsQuery.forEach((detailResult) => {
      detailResult.data && detailsResults.push(detailResult.data);
    });
  }

  return detailsResults;
}
