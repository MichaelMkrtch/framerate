import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { SavedMedia } from "@/types";

type SavedToList = {
  id: number;
  title: string;
  posterPath: string;
};

type ListContent = {
  savedMedia: SavedMedia[];
  listContent: SavedToList[];
  setListContent: (mediaArr: SavedToList[]) => void;
  addMedia: (media: SavedMedia) => void;
  removeMedia: (listId: number) => void;
  clearMedia: () => void;
  clearListContent: () => void;
};

export const useListContentStore = create<ListContent>()(
  persist(
    (set) => ({
      savedMedia: [],
      listContent: [],
      setListContent: (mediaArr) => set(() => ({ listContent: mediaArr })),
      addMedia: (media) =>
        set((state) => ({ savedMedia: [...state.savedMedia, media] })),
      removeMedia: (listId) =>
        set((state) => ({
          savedMedia: state.savedMedia.filter(
            (media) => listId !== media.listId,
          ),
        })),
      clearMedia: () => set(() => ({ savedMedia: [] })),
      clearListContent: () => set(() => ({ listContent: [] })),
    }),
    {
      name: "listContentStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
