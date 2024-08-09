import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ListContent } from "@/types";

type ListContentStore = {
  savedMedia: ListContent[];
  listContent: ListContent[];
  setListContent: (mediaArr: ListContent[]) => void;
  addMedia: (media: ListContent) => void;
  // removeMedia: (listId: number) => void;
  removeListContent: (
    mediaId: number,
    listContentId: number,
    mediaType: "movie" | "tv",
  ) => void;
  clearMedia: () => void;
  clearListContent: () => void;
};

export const useListContentStore = create<ListContentStore>()(
  persist(
    (set) => ({
      savedMedia: [],
      listContent: [],
      setListContent: (mediaArr) => set(() => ({ listContent: mediaArr })),
      addMedia: (media) =>
        set((state) => ({ savedMedia: [...state.savedMedia, media] })),
      // removeMedia: (listId) =>
      //   set((state) => ({
      //     savedMedia: state.savedMedia.filter(
      //       (media) => listId !== media.listId,
      //     ),
      //   })),
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
      clearMedia: () => set(() => ({ savedMedia: [] })),
      clearListContent: () => set(() => ({ listContent: [] })),
    }),
    {
      name: "listContentStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
