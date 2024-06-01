import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type Film } from "@/types";

interface FilmState {
  films: Film[];
  setFilm: (film: Film) => void;
}

function enforceUniqueFilms(newFilm: Film, films: Film[]) {
  const updatedfilms = [...films, newFilm];
  const filmsMap = new Map(updatedfilms.map((film) => [film.id, film]));
  const uniqueFilms = Array.from(filmsMap.values());
  return uniqueFilms;
}

export const useFilmStore = create<FilmState>()(
  persist(
    (set) => ({
      films: [] as Film[],
      setFilm: (film) =>
        set((state) => ({
          films: enforceUniqueFilms(film, state.films),
        })),
    }),
    {
      name: "film-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
