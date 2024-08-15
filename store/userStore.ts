import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  username: string | null;
  isLoggedIn: boolean;
  setUsername: (username: string) => void;
  setIsLoggedIn: (bool: boolean) => void;
  clearUsername: () => void;
};

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,
      setUsername: (username) => set(() => ({ username: username })),
      setIsLoggedIn: (bool) => set(() => ({ isLoggedIn: bool })),
      clearUsername: () => set(() => ({ username: null })),
    }),
    {
      name: "userStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
