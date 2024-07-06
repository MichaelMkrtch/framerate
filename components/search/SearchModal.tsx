import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { type Media } from "@/types";

import useFetchDetails from "@/hooks/useFetchDetails";
import useFetchTrending from "@/hooks/useFetchTrending";
import useSearch from "@/hooks/useSearch";

import Modal from "../ui/Modal";
import { VisuallyHidden } from "../ui/VisuallyHidden";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

export default function SearchModal({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Media[]>([]);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const searchElement = useRef<HTMLInputElement>(null);

  const trendingData = useFetchTrending("all", "day");

  const detailsData = useFetchDetails(results);
  const { searchData, isFetching } = useSearch(query);

  useEffect(() => {
    if (trendingData && !isFetching) {
      setResults(trendingData.slice(0, 10));
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

  if (isDesktop) {
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

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground
      setBackgroundColorOnScale={false}
      direction="top"
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Search</DrawerTitle>
            <DrawerDescription>Search by title.</DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>

        <div
          data-vaul-no-drag
          className="no-scrollbar w-full max-w-md overflow-auto"
        >
          <SearchBar
            ref={searchElement}
            searchQuery={query}
            setSearchQuery={setQuery}
            onChange={handleChange}
          />
          <SearchResultList results={detailsData} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
