"use client";

import { useEffect } from "react";
import Link from "next/link";

import { toast } from "sonner";

import { useAuthStore } from "@/store/auth/auth-store";
import { useListStore } from "@/store/collections/list-store";
import { getLists } from "@/features/collections/server/db/list";
import { getSimpleTitle } from "@/lib/utils";

export default function Sidebar() {
  const { username } = useAuthStore();
  const { lists, setLists, setActiveList } = useListStore();

  useEffect(() => {
    (async () => {
      if (lists.length === 0) {
        const results = await getLists();

        if (results) return setLists(results);

        toast("Please create an account or log in to see your collections!");
      }
    })();
  }, [lists, setLists]);

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
    <nav className="sticky top-10 flex flex-col gap-4 overflow-scroll rounded-lg bg-background-darker p-5">
      <h2 className="pl-2 text-left text-lg font-semibold">Your Collections</h2>

      <div>
        {lists.length > 0 &&
          lists.map((list, index) => {
            const simpleListName = list && getSimpleTitle(list.name);
            const gradientIndex =
              index < gradients.length
                ? index
                : Math.floor(Math.random() * gradients.length);

            return (
              <Link
                key={list.id}
                href={`/${username}/collections/${simpleListName}`}
                onClick={() => setActiveList(list.id, list.name)}
                className="my-1 flex items-center gap-3.5 rounded-md p-2 transition-colors duration-75 ease-in hover:bg-white/5"
              >
                <div
                  className={`${gradients[gradientIndex]} h-9 w-9 rounded`}
                />
                <p>{list.name}</p>
              </Link>
            );
          })}
      </div>
    </nav>
  );
}
