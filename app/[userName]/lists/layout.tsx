"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import { ArrowLeft } from "@/components/ui/Icons";
import { useListsStore } from "@/store/listsStore";

export default function ListsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { activeList } = useListsStore((state) => ({
    activeList: state.activeList,
  }));

  return (
    <div className="px-3 pb-3 pt-20 md:px-0 md:pt-32">
      {activeList && (
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center"
        >
          <ArrowLeft fill="#e4e4e7" classes="w-[18px] h-[18px] mr-2" /> Back to
          lists
        </button>
      )}
      <h2 className="text-lg font-medium md:text-xl">
        {activeList ? activeList.name : "Lists"}
      </h2>
      <section className="mt-10">{children}</section>
    </div>
  );
}
