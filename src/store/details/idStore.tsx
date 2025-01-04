import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IdState = {
  id: number;
};

type IdActions = {
  setId: (id: number) => void;
};

export const useIdStore = create<IdState & IdActions>()(
  persist(
    (set) => ({
      id: 0,
      setId: (id) => set(() => ({ id })),
    }),
    {
      name: "idStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
