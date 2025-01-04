import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EmailState = {
  email: string;
};

type EmailActions = {
  setEmail: (email: string) => void;
};

export const useEmailStore = create<EmailState & EmailActions>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set(() => ({ email: email })),
    }),
    {
      name: "emailStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
