import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type Film } from "@/types";

interface FilmState {
  film: Film;
  setFilm: (film: Film) => void;
}

export const useFilmStore = create<FilmState>()(
  persist(
    (set) => ({
      film: {} as Film,
      setFilm: (film) => set((state) => ({ film })),
    }),
    {
      name: "film-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
