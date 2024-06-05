import { fetchDetails } from "@/services/fetchDetails";
import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";
import { searchMovies } from "@/services/searchMovies";
import { useQuery, useSuspenseQueries } from "@tanstack/react-query";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { type Film, SearchResults } from "@/types";

import { useDebounce } from "@/hooks/useDebounce";

import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

export default function SearchModal({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Film[]>([]);
  const searchElement = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query);

  const idList: number[] = [];
  const detailsResults: Film[] = [];
  results.forEach((result) => idList.push(result.id));

  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingMovies,
    staleTime: 60 * 1000,
    enabled: debouncedQuery === "",
  });

  const { data: searchData, isFetching } = useQuery({
    queryKey: ["films", debouncedQuery],
    queryFn: ({ signal }) => searchMovies({ signal, query }),
    staleTime: 1 * 60 * 1000,
    enabled: debouncedQuery !== "",
  });

  const detailsQuery = useSuspenseQueries({
    queries: idList.map((id) => ({
      queryKey: ["details", id],
      queryFn: () => fetchDetails(id),
      staleTime: 2 * 6 * 1000,
      enabled: id >= 0,
    })),
  });

  if (detailsQuery) {
    detailsQuery.forEach((detailResult) => {
      detailResult.data && detailsResults.push(detailResult.data);
    });
  }

  useEffect(() => {
    if (trendingData && !isFetching) {
      setResults(trendingData);
    }

    if (searchData) {
      setResults(searchData);
    }
  }, [trendingData, searchData, isFetching]);

  function handleChange() {
    if (searchElement.current) {
      setQuery(searchElement.current.value);
    }
  }

  return (
    <Modal>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content title="Search" description="Search by title.">
        <SearchBar
          ref={searchElement}
          searchQuery={query}
          setSearchQuery={setQuery}
          onChange={handleChange}
        />
        <SearchResultList results={detailsResults} />
      </Modal.Content>
    </Modal>
  );
}
