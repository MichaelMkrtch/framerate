"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import PosterGrid from "@/components/PosterGrid";
import { getListItems } from "@/features/collections/server/db/list";

export default function CollectionPage() {
  const { username } = useParams<{
    username: string;
  }>();

  const activeList = useListStore((state) => state.activeList);

  const listItems = useListItemStore((state) => state.listItems);
  const setListItems = useListItemStore((state) => state.setListItems);

  useEffect(() => {
    (async () => {
      if (activeList) {
        const listItems = await getListItems(username, activeList.id);
        if (listItems) setListItems(listItems);
      }
    })();

    return () => {
      setListItems([]);
    };
  }, [activeList, username, setListItems]);

  return (
    <div className="mt-10">
      <div className="animate-fade-in rounded border border-white/10 bg-background-darker px-3 py-4">
        <h3 className="mb-6">
          {activeList?.name} by {username}
        </h3>
        {listItems.length > 0 && (
          <div className="animate-fade-in">
            <PosterGrid media={listItems} isTooltipEnabled={false} />
          </div>
        )}
      </div>
    </div>
  );
}
