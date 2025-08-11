import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  email: string;
  name: string;
  username: string;
};

type UserActions = {
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  reset: () => void;
};

const initialState: UserState = {
  email: '',
  name: '',
  username: '',
};

export const useAuthStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      username: '',
      name: '',
      email: '',
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name: name }),
      setUsername: (username: string) => set({ username: username }),
      reset: () => set(() => initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
