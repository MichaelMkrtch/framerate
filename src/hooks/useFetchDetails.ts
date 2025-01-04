import { useEffect } from "react";

import { useQueries } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchRoute } from "@/lib/utils";

export default function useFetchDetails<T extends "movie" | "tv">(
  fetchList: { mediaType: T; id: number }[],
) {
  const detailsQuery = useQueries({
    queries: fetchList.map((media) => ({
      queryKey: [`${media.mediaType}-details`, media.id],
      queryFn: () =>
        fetchRoute(
          `/api/details?type=${media.mediaType}&id=${media.id}`,
          media.mediaType,
          "details",
        ),
      staleTime: 1000 * 60 * 2,
      enabled: fetchList.length > 0,
    })),
  });

  useEffect(() => {
    if (detailsQuery.some((queryResult) => queryResult.isError)) {
      toast.error("An error occurred while fetching details!", {
        duration: 5000,
      });
    }
  }, [detailsQuery]);

  return detailsQuery;
}
