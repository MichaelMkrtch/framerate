"use client";

import { useEffect } from "react";

import PosterGrid from "@/components/ui/PosterGrid";
import { getSavedMovies, getSavedSeries } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";
import { useUserStore } from "@/store/userStore";

export default function ListPage() {
  const { username } = useUserStore((state) => ({
    username: state.username,
  }));

  const { activeList } = useListsStore((state) => ({
    activeList: state.activeList,
  }));

  const { listContent, setListContent } = useListContentStore((state) => ({
    listContent: state.listContent,
    setListContent: state.setListContent,
    clearListContent: state.clearListContent,
  }));

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
    <>
      <h3 className="mb-3">List by {username}</h3>
      <div className="rounded bg-[#1d1f24] px-3 py-4 ring-2 ring-neutral-800">
        {listContent && (
          <PosterGrid reviews={listContent} tooltipEnabled={false} />
        )}
      </div>
    </>
  );
}
