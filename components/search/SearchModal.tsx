import { useQuery, useSuspenseQueries } from "@tanstack/react-query";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { type Film } from "@/types";

import { useDebounce } from "@/hooks/useDebounce";

import fetchRoute from "@/utils/fetchRoute";

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
    queryFn: () => fetchRoute("/api/trending"),
    staleTime: 60 * 1000,
    enabled: debouncedQuery === "",
  });

  const { data: searchData, isFetching } = useQuery({
    queryKey: ["films", debouncedQuery],
    queryFn: () => fetchRoute(`/api/search?query=${debouncedQuery}`),
    staleTime: 1 * 60 * 1000,
    enabled: debouncedQuery !== "",
  });

  const detailsQuery = useSuspenseQueries({
    queries: idList.map((id) => ({
      queryKey: ["details", id],
      queryFn: () => fetchRoute(`/api/details?id=${id}`),
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
