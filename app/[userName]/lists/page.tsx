"use client";

import Link from "next/link";
import { useEffect } from "react";

import getSimpleTitle from "@/utils/getSimpleTitle";

import Card from "@/components/ui/Card";
import { getLists } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";
import { useUserStore } from "@/store/userStore";

export default function ListsPage() {
  const { username } = useUserStore((state) => ({
    username: state.username,
  }));

  const { userLists, setActiveList, setLists, clearActiveList } = useListsStore(
    (state) => ({
      userLists: state.userLists,
      setActiveList: state.setActiveList,
      setLists: state.setLists,
      clearActiveList: state.clearActiveList,
    }),
  );

  const { clearListContent } = useListContentStore((state) => ({
    clearListContent: state.clearListContent,
  }));

  useEffect(() => {
    clearActiveList();
    clearListContent();

    (async () => {
      if (userLists.length === 0) {
        const results = await getLists();
        results && setLists(results);
      }
    })();
  }, [userLists, setLists]);

  function handleClick(listId: number, listName: string) {
    setActiveList(listId, listName);
  }

  return (
    <div>
      {userLists.length > 0 &&
        userLists.map((list) => {
          const formattedName = list && getSimpleTitle(list.name);

          return (
            list && (
              <Card key={`${list.name}-${list.id}`} classes="h-fit mb-6">
                <Link
                  key={`${list.name}-${list.id}`}
                  href={`/${username}/lists/${formattedName}`}
                  onClick={() => handleClick(list.id, list.name)}
                  className="w-fit rounded bg-gray-850 px-4 py-2"
                >
                  {list.name}
                </Link>
              </Card>
            )
          );
        })}
    </div>
  );
}
