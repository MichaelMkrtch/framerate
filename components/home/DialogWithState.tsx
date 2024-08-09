"use client";

import { type ReactNode, useEffect } from "react";

import { Dialog } from "@/components/ui/Dialog";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

export default function DialogWithState({ children }: { children: ReactNode }) {
  const { clearMedia, clearListContent } = useListContentStore((state) => ({
    clearMedia: state.clearMedia,
    clearListContent: state.clearListContent,
  }));

  const { clearLists, clearActiveList } = useListsStore((state) => ({
    clearLists: state.clearLists,
    clearActiveList: state.clearActiveList,
  }));

  useEffect(() => {
    clearMedia();
    clearLists();
    clearListContent();
    clearActiveList();
  }, []);

  return <Dialog>{children}</Dialog>;
}
