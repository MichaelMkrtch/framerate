import type { ActiveList, List } from "@/types/data.types";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ListState = {
  lists: List[];
  activeList: ActiveList | null;
};

type ListActions = {
  setActiveList: (listName: string) => void;
  setLists: (lists: List[]) => void;
  addList: (list: List) => void;
  removeList: (listId: number) => void;
  clearLists: () => void;
  clearActiveList: () => void;
};

export const useListStore = create<ListState & ListActions>()(
  persist(
    (set) => ({
      lists: [],
      activeList: null,
      setActiveList: (listName) => set({ activeList: { name: listName } }),
      setLists: (lists) => set({ lists: lists }),
      addList: (list) =>
        set((state) => ({ lists: [list, ...(state.lists ?? [])] })),
      removeList: (listId) =>
        set((state) => ({
          lists: state.lists?.filter((list) => list.id !== listId),
        })),
      clearLists: () => set({ lists: [] }),
      clearActiveList: () => set({ activeList: null }),
    }),
    {
      name: "list-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
