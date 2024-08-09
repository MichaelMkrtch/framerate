"use client";

import { type ReactNode, useEffect } from "react";

import { Dialog } from "@/components/ui/Dialog";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

export default function DialogWithState({ children }: { children: ReactNode }) {
  const { clearListContent } = useListContentStore((state) => ({
    clearListContent: state.clearListContent,
  }));

  const { clearLists, clearActiveList } = useListsStore((state) => ({
    clearLists: state.clearLists,
    clearActiveList: state.clearActiveList,
  }));

  useEffect(() => {
    clearListContent();
    clearLists();
    clearListContent();
    clearActiveList();
  }, []);

  return <Dialog>{children}</Dialog>;
}
