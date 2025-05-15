import type { List } from "@web/types/lists";

import { createSelectors } from "@web/lib/store-selector";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ListState = {
  lists: List[];
};

type ListActions = {
  setLists: (lists: List[]) => void;
  addList: (list: List) => void;
  removeList: (listId: number) => void;
  clearLists: () => void;
};

const useListStoreBase = create<ListState & ListActions>()(
  persist(
    (set) => ({
      lists: [],
      setLists: (lists) => set({ lists: lists }),
      addList: (list) =>
        set((state) => ({ lists: [...(state.lists ?? []), list] })),
      removeList: (listId) =>
        set((state) => ({
          lists: state.lists?.filter((list) => list.id !== listId),
        })),
      clearLists: () => set({ lists: [] }),
    }),
    {
      name: "list-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useListStore = createSelectors(useListStoreBase);
