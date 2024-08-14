import { useQueries } from "@tanstack/react-query";

import { Media } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

export default function useFetchDetails(
  fetchList: { mediaType: "movie" | "tv" | "person"; id: number }[],
) {
  const mediaOnlyFetchList = fetchList.filter(
    (list) => list.mediaType !== "person",
  );

  const detailsResults: Media[] = [];

  const detailsQuery = useQueries({
    queries: mediaOnlyFetchList.map((item) => ({
      queryKey: [`${item.mediaType}-details`, item.id],
      queryFn: () =>
        fetchRoute(`/api/details?type=${item.mediaType}&id=${item.id}`),
      staleTime: 1000 * 60 * 2,
      enabled: mediaOnlyFetchList.length > 0,
    })),
  });

  if (detailsQuery) {
    detailsQuery.forEach((detailResult) => {
      detailResult.data && detailsResults.push(detailResult.data);
    });
  }

  return detailsResults;
}
