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

function removeDuplicates(
  listContentState: ListContent[],
  newListContent: ListContent,
) {
  const updated = [...listContentState, newListContent];
  const unique = [
    ...new Map(
      updated.map((v) => [JSON.stringify([v.listId, v.mediaId]), v]),
    ).values(),
  ];
  return unique;
}

export const useListContentStore = create<ListContentStore>()(
  persist(
    (set) => ({
      listContent: [],
      setListContent: (mediaArr) => set(() => ({ listContent: mediaArr })),
      addListContent: (media) =>
        set((state) => ({
          listContent: removeDuplicates(state.listContent, media),
        })),
      removeListContent: (mediaId, listContentId, mediaType) =>
        set((state) => ({
          listContent: state.listContent.filter((media) => {
            if (
              mediaType === media.mediaType &&
              mediaId === media.mediaId &&
              listContentId === media.listContentId
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
