"use client"

import { type ReactNode } from "react";

import { useListsStore } from "@/store/listsStore";

export default function ListsLayout({ children }: { children: ReactNode }) {
  const { activeList } = useListsStore((state) => ({
    activeList: state.activeList,
  }));

  return (
    <div className="px-3 pb-3 pt-20 md:px-0 md:pt-32">
      <h2 className="text-lg font-medium md:text-xl">
        {activeList ? activeList.name : "Lists"}
      </h2>
      <section className="mt-10">{children}</section>
    </div>
  );
}
