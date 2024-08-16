import { create } from "zustand";

import { type StoredRating } from "@/types";

type ReviewStore = {
  storedRating: StoredRating | null;
  isWatched: boolean | null;
  setStoredRating: (storedRating: StoredRating) => void;
  setIsWatched: (bool: boolean | null) => void;
};

export const useReviewStore = create<ReviewStore>()((set) => ({
  storedRating: null,
  isWatched: null,
  setStoredRating: (storedRating) =>
    set(() => ({ storedRating: storedRating })),
  setIsWatched: (bool) => set(() => ({ isWatched: bool })),
}));
