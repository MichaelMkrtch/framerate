import { useQuery } from "@tanstack/react-query";

import { type Media } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

import useDebounce from "./useDebounce";

export default function useSearch(query: string) {
  const debouncedQuery = useDebounce(query);

  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchRoute(`/api/search?query=${debouncedQuery}`),
    staleTime: 1000 * 60 * 1,
    enabled: debouncedQuery !== "",
  });

  const searchData: Media[] = data;

  return { searchData, isFetching };
}
