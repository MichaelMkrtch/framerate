import { type ReactNode, useEffect, useRef, useState } from "react";

import { type Film } from "@/types";

import useFetchDetails from "@/hooks/useFetchDetails";
import useFetchTrending from "@/hooks/useFetchTrending";
import useSearchFilms from "@/hooks/useSearchFilms";

import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

export default function SearchModal({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Film[]>([]);
  const searchElement = useRef<HTMLInputElement>(null);

  const trendingData = useFetchTrending("day");
  const detailsData = useFetchDetails(results);
  const { searchData, isFetching } = useSearchFilms(query);

  useEffect(() => {
    if (trendingData && !isFetching) {
      setResults(trendingData.slice(0, 5));
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
        <SearchResultList results={detailsData} />
      </Modal.Content>
    </Modal>
  );
}
