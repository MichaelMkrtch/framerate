import { create } from "zustand";

import { type Film } from "@/types";

interface FilmState {
  film: Film;
  setFilm: (film: Film) => void;
}

export const useFilmStore = create<FilmState>()((set) => ({
  film: {} as Film,
  setFilm: (film) => set((state) => ({ film })),
}));
