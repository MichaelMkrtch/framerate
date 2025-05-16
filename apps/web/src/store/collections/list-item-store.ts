import type { ListItem } from "@web/types/lists";

import { createSelectors } from "@web/lib/store-selector";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ListState = {
  listItems: ListItem[];
};

type ListActions = {
  setListItems: (listItems: ListItem[]) => void;
  addListItem: (listItem: ListItem) => void;
  removeListItem: (
    mediaType: "movie" | "tv",
    listItemId: number,
    mediaId: number,
  ) => void;
  clearListItems: () => void;
};

function removeDuplicates(
  existingListItems: ListItem[],
  newListItem: ListItem,
) {
  const updated = [...existingListItems, newListItem];
  const unique = [
    ...new Map(
      updated.map((v) => [JSON.stringify([v.listId, v.mediaId]), v]),
    ).values(),
  ];
  return unique;
}

const useListItemStoreBase = create<ListState & ListActions>()(
  persist(
    (set) => ({
      listItems: [],
      setListItems: (listItems) => set({ listItems: listItems }),
      addListItem: (listItem) =>
        set((state) => ({
          listItems: removeDuplicates(state.listItems, listItem),
        })),
      removeListItem: (mediaType, listItemId) =>
        set((state) => ({
          listItems: state.listItems.filter((listItem) => {
            if (
              listItem.mediaType === mediaType &&
              listItem.listItemId === listItemId
            ) {
              return false;
            } else {
              return true;
            }
          }),
        })),
      clearListItems: () => set({ listItems: [] }),
    }),
    {
      name: "list-item-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useListItemStore = createSelectors(useListItemStoreBase);
