import type { StoredRating } from '@/types/ratings';

import { create } from 'zustand';

import { createSelectors } from '@/lib/store-selector';

type ReviewState = {
  storedRating: StoredRating;
  isLiked: boolean;
  isWatched: boolean;
};

type ReviewActions = {
  setStoredRating: (storedRating: StoredRating) => void;
  setIsLiked: (bool: boolean) => void;
  setIsWatched: (bool: boolean) => void;
  clearMediaActions: () => void;
};

const useReviewStoreBase = create<ReviewState & ReviewActions>()((set) => ({
  storedRating: { avgRating: 0, reviewCount: 0 },
  isLiked: false,
  isWatched: false,
  setStoredRating: (storedRating) => set({ storedRating: storedRating }),
  setIsLiked: (bool) => set({ isLiked: bool }),
  setIsWatched: (bool) => set({ isWatched: bool }),
  clearMediaActions: () => set({ isLiked: false, isWatched: false }),
}));

export const useReviewStore = createSelectors(useReviewStoreBase);
