import type { ActiveList, List } from "@web/types/lists";

import { createSelectors } from "@web/lib/store-selector";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ActiveListState = {
  activeList: ActiveList | null;
  likeCount: number;
  saveCount: number;
  isLiked: boolean;
  isSaved: boolean;
};

type ActiveListActions = {
  setActiveList: (list: List) => void;
  setLikeCount: (likeCount: number) => void;
  setSaveCount: (saveCount: number) => void;
  setIsLiked: (likeStatus: boolean) => void;
  setIsSaved: (saveStatus: boolean) => void;
  clearActiveList: () => void;
};

const initialState = {
  activeList: null,
  likeCount: 0,
  saveCount: 0,
  isLiked: false,
  isSaved: false,
};

const useActiveListStoreBase = create<ActiveListState & ActiveListActions>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveList: (list) => set({ activeList: list }),
      setLikeCount: (likeCount) => set({ likeCount }),
      setSaveCount: (saveCount) => set({ saveCount }),
      setIsLiked: (likeStatus) => set({ isLiked: likeStatus }),
      setIsSaved: (saveStatus) => set({ isSaved: saveStatus }),
      clearActiveList: () => set({ ...initialState }),
    }),
    {
      name: "active-list-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useActiveListStore = createSelectors(useActiveListStoreBase);
