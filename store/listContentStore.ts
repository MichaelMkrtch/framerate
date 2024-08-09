import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type ListContent } from "@/types";

type ListContentStore = {
  listContent: ListContent[];
  setListContent: (mediaArr: ListContent[]) => void;
  addListContent: (media: ListContent) => void;
  removeListContent: (
    mediaId: number,
    listContentId: number,
    mediaType: "movie" | "tv",
  ) => void;
  clearListContent: () => void;
};

export const useListContentStore = create<ListContentStore>()(
  persist(
    (set) => ({
      listContent: [],
      setListContent: (mediaArr) => set(() => ({ listContent: mediaArr })),
      addListContent: (media) =>
        set((state) => ({ listContent: [...state.listContent, media] })),
      removeListContent: (mediaId, listContentId, mediaType) =>
        set((state) => ({
          listContent: state.listContent.filter((media) => {
            if (
              mediaId === media.mediaId &&
              listContentId === media.listContentId &&
              mediaType === media.mediaType
            ) {
              return false;
            } else {
              return true;
            }
          }),
        })),
      clearListContent: () => set(() => ({ listContent: [] })),
    }),
    {
      name: "listContentStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
