import { create } from "zustand";

type StoredRating = {
  avgRating: number;
  reviewCount: number;
};

type ReviewState = {
  storedRating: StoredRating | null;
  isLiked: boolean;
  isWatched: boolean;
};

type ReviewActions = {
  setStoredRating: (storedRating: StoredRating | null) => void;
  setIsLiked: (bool: boolean) => void;
  setIsWatched: (bool: boolean) => void;
  clearMediaActions: () => void;
};

export const useReviewStore = create<ReviewState & ReviewActions>()((set) => ({
  storedRating: { avgRating: 0, reviewCount: 0 },
  isLiked: false,
  isWatched: false,
  setStoredRating: (storedRating) =>
    set(() => ({ storedRating: storedRating })),
  setIsLiked: (bool) => set(() => ({ isLiked: bool })),
  setIsWatched: (bool) => set(() => ({ isWatched: bool })),
  clearMediaActions: () => set(() => ({ isLiked: false, isWatched: false })),
}));
