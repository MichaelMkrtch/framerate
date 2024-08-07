import { create } from "zustand";

type User = {
  username: string | null;
  setUsername: (username: string) => void;
  clearUsername: () => void;
};

export const useUserStore = create<User>()((set) => ({
  username: null,
  setUsername: (username) => set(() => ({ username: username })),
  clearUsername: () => set(() => ({ username: null })),
}));
