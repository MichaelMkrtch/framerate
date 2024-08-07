import { create } from "zustand";

import { SavedMedia } from "@/types";

type SavedToList = {
  id: number;
  title: string;
  posterPath: string;
};

type ListContent = {
  savedMedia: SavedMedia[];
  listContent: SavedToList[];
  addMedia: (media: SavedMedia) => void;
  setListContent: (mediaArr: SavedToList[]) => void;
  removeMedia: (listId: number) => void;
  clearMedia: () => void;
  clearListContent: () => void;
};

export const useListContentStore = create<ListContent>()((set) => ({
  savedMedia: [],
  listContent: [],
  setListContent: (mediaArr) => set(() => ({ listContent: mediaArr })),
  addMedia: (media) =>
    set((state) => ({ savedMedia: [...state.savedMedia, media] })),
  removeMedia: (listId) =>
    set((state) => ({
      savedMedia: state.savedMedia.filter((media) => listId !== media.listId),
    })),
  clearMedia: () => set(() => ({ savedMedia: [] })),
  clearListContent: () => set(() => ({ listContent: [] })),
}));
