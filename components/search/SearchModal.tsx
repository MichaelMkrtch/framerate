import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { useDebounce } from "@/hooks/useDebounce";
import { type Film } from "@/types";
import { fetchTrendingMovies } from "@/utils/fetchTrendingMovies";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useEffect, useState } from "react";

export default function SearchModal({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Film[]>([]);
  const debouncedQuery = useDebounce(query);

  const { data: trendingData } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingMovies,
    staleTime: 60 * 1000,
    enabled: debouncedQuery === "",
  });

  useEffect(() => {
    if (trendingData) {
      setResults(trendingData);
    }
  }, [trendingData]);

  return (
    <Modal>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content
        title="Search"
        description="Search for a film by it's title."
      >
        <SearchBar />
        <SearchResultList results={results} />
      </Modal.Content>
    </Modal>
  );
}
