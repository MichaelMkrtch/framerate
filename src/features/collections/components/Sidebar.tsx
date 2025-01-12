"use client";

import { useEffect } from "react";
import Link from "next/link";

import { gradients } from "@/data/css-gradients";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth/auth-store";
import { useListStore } from "@/store/collections/list-store";
import { getLists } from "@/features/collections/server/db/list";
import { getSimpleTitle } from "@/lib/utils";

export default function Sidebar() {
  const username = useAuthStore((state) => state.username);

  const lists = useListStore((state) => state.lists);
  const setLists = useListStore((state) => state.setLists);
  const setActiveList = useListStore((state) => state.setActiveList);

  useEffect(() => {
    (async () => {
      if (lists.length === 0) {
        const results = await getLists();

        if (results) return setLists(results);

        toast("Please create an account or log in to see your collections!");
      }
    })();
  }, [lists, setLists]);

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
