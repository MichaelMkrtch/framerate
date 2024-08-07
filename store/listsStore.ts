import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type ListData } from "@/types";

type ActiveList = {
  id: number;
  name: string;
};

type Lists = {
  userLists: ListData<"list">[];
  activeList: ActiveList | null;
  setActiveList: (listId: number, listName: string) => void;
  setLists: (lists: ListData<"list">[]) => void;
  addList: (list: ListData<"list">) => void;
  removeList: (listId: number) => void;
  clearActiveList: () => void;
};

export const useListsStore = create<Lists>()(
  persist(
    (set) => ({
      userLists: [],
      activeList: null,
      setActiveList: (listId, listName) =>
        set(() => ({ activeList: { id: listId, name: listName } })),
      setLists: (lists) => set(() => ({ userLists: lists })),
      addList: (list) =>
        set((state) => ({ userLists: [...state.userLists, list] })),
      removeList: (listId) =>
        set((state) => ({
          userLists: state.userLists.filter(
            (userList) => userList && userList.id !== listId,
          ),
        })),
      clearActiveList: () => set(() => ({ activeList: null })),
    }),
    {
      name: "activeListStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
