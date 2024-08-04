import { create } from "zustand";

import { SavedMedia } from "@/types";

type ListContent = {
  savedMedia: SavedMedia[];
  addMedia: (media: SavedMedia) => void;
  removeMedia: (listId: number) => void;
  clearMedia: () => void;
};

export const useListContentStore = create<ListContent>()((set) => ({
  savedMedia: [],
  addMedia: (media) =>
    set((state) => ({ savedMedia: [...state.savedMedia, media] })),
  removeMedia: (listId) =>
    set((state) => ({
      savedMedia: state.savedMedia.filter((media) => listId !== media.listId),
    })),
  clearMedia: () => set((state) => ({ savedMedia: [] })),
}));
