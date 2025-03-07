import { useEffect } from "react";

import { Trending } from "@/types/tmdb.types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchRoute } from "@/lib/utils";

export default function useFetchTrending<
  T extends "all" | "movie" | "tv" | "person",
>(filter: T, timeWindow: string, debouncedQuery?: string) {
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

  useEffect(() => {
    if (error) {
      toast.error(error.message, { duration: 5000 });
      return;
    }
  }, [error]);

  return data as Trending<T>[];
}
