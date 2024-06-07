import { useQuery } from "@tanstack/react-query";

import { type Film } from "@/types";

import fetchRoute from "@/utils/fetchRoute";

import useDebounce from "./useDebounce";

export default function useSearchFilms(query: string) {
  const debouncedQuery = useDebounce(query);

  const { data, isFetching } = useQuery({
    queryKey: ["films", debouncedQuery],
    queryFn: () => fetchRoute(`/api/search?query=${debouncedQuery}`),
    staleTime: 1000 * 60 * 1,
    enabled: debouncedQuery !== "",
  });

  const searchData: Film[] = data;

  return { searchData, isFetching };
}
