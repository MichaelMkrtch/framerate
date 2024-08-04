import { create } from "zustand";

import { type ListData } from "@/types";

type Lists = {
  userLists: ListData<"list">[];
  setLists: (lists: ListData<"list">[]) => void;
  addList: (list: ListData<"list">) => void;
  removeList: (listId: number) => void;
};

export const useListsStore = create<Lists>()((set) => ({
  userLists: [],
  setLists: (lists) => set((state) => ({ userLists: lists })),
  addList: (list) =>
    set((state) => ({ userLists: [...state.userLists, list] })),
  removeList: (listId) =>
    set((state) => ({
      userLists: state.userLists.filter(
        (userList) => userList && userList.id !== listId,
      ),
    })),
}));
