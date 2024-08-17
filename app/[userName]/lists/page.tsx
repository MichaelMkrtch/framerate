"use client";

import Link from "next/link";
import { useEffect } from "react";

import getSimpleTitle from "@/utils/getSimpleTitle";

import CreateList from "@/components/profile/lists/CreateList";
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
  }, [userLists, setLists, clearActiveList, clearListContent]);

  function handleClick(listId: number, listName: string) {
    setActiveList(listId, listName);
  }

  const gradients = [
    "bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600",
    "bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500",
    "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
    "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900",
    "bg-gradient-to-r from-yellow-200 via-amber-400 to-orange-600",
    "bg-gradient-to-r from-green-200 via-emerald-400 to-teal-600",
    "bg-gradient-to-r from-cyan-100 via-blue-300 to-indigo-400",
    "bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600",
    "bg-gradient-to-r from-orange-200 via-red-400 to-pink-600",
    "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500",
  ];

  return (
    <>
      <div className="mb-6 w-3/5">
        <CreateList />
      </div>

      <section className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-5">
        {userLists.length > 0 &&
          userLists.map((list, index) => {
            const formattedName = list && getSimpleTitle(list.name);
            const gradientIndex =
              index < gradients.length
                ? index
                : Math.floor(Math.random() * gradients.length);

            return (
              list && (
                <div
                  key={`${list.name}-${list.id}`}
                  className={`${gradients[gradientIndex]} animate-fade-in-fast w-full rounded`}
                >
                  <Link
                    key={`${list.name}-${list.id}`}
                    href={`/${username}/lists/${formattedName}`}
                    onClick={() => handleClick(list.id, list.name)}
                    className="h-full w-full"
                  >
                    <Card classes="relative top-3 h-full w-full !py-12 !bg-gray-850/60 !rounded-t-none">
                      {list.name}
                    </Card>
                  </Link>
                </div>
              )
            );
          })}
      </section>
    </>
  );
}
