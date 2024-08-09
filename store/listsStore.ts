import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type UserList } from "@/types";

type ActiveList = {
  id: number;
  name: string;
};

type Lists = {
  userLists: UserList<"list">[];
  activeList: ActiveList | null;
  setActiveList: (listId: number, listName: string) => void;
  setLists: (lists: UserList<"list">[]) => void;
  addList: (list: UserList<"list">) => void;
  removeList: (listId: number) => void;
  clearLists: () => void;
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
      clearLists: () => set(() => ({ userLists: [] })),
      clearActiveList: () => set(() => ({ activeList: null })),
    }),
    {
      name: "activeListStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
