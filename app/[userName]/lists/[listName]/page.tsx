"use client";

import { useEffect } from "react";

import PosterGrid from "@/components/ui/PosterGrid";
import { getSavedMovies, getSavedSeries } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

export default function ListPage() {
  const { activeList } = useListsStore((state) => ({
    activeList: state.activeList,
  }));

  const { listContent, setListContent, clearListContent } = useListContentStore(
    (state) => ({
      listContent: state.listContent,
      setListContent: state.setListContent,
      clearListContent: state.clearListContent,
    }),
  );

  useEffect(() => {
    (async () => {
      if (activeList) {
        const tvResults = await getSavedSeries(activeList.id);
        const movieResults = await getSavedMovies(activeList.id);

        if (tvResults && movieResults) {
          const results = movieResults.concat(tvResults);
          results.length > 0 && setListContent(results);
        }
      }
    })();
  }, [setListContent]);

  return (
    listContent && <PosterGrid reviews={listContent} tooltipEnabled={false} />
  );
}
