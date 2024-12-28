import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EmailStore = {
  email: string;
  setEmail: (email: string) => void;
};

export const useEmailStore = create<EmailStore>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set(() => ({ email: email })),
    }),
    {
      name: "emailStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
