import { useEffect } from "react";

import { Media } from "@/types/tmdb.types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchRoute } from "@/lib/utils";
import useDebounce from "./useDebounce";

export default function useSearch(query: string) {
  const debouncedQuery = useDebounce(query);

  const { data, isFetching, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      fetchRoute(`/api/search?query=${debouncedQuery}`, "movie", "search"),
    staleTime: 1000 * 60 * 1,
    enabled: debouncedQuery !== "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message, { duration: 5000 });
      return;
    }
  }, [error]);

  const searchData = data as { message: string; results?: Media[] };

  return { searchData, isFetching };
}
