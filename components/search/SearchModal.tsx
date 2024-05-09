import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { useDebounce } from "@/hooks/useDebounce";
import { type Film } from "@/types";
import { fetchTrendingMovies } from "@/utils/fetchTrendingMovies";
import { searchMovies } from "@/utils/searchMovies";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useEffect, useRef, useState } from "react";

export default function SearchModal({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Film[]>([]);
  const searchElement = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query);

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

      <Modal.Content
        title="Search"
        description="Search for a film by it's title."
      >
        <SearchBar
          ref={searchElement}
          searchQuery={query}
          setSearchQuery={setQuery}
          onChange={handleChange}
        />
        <SearchResultList results={results} />
      </Modal.Content>
    </Modal>
  );
}
