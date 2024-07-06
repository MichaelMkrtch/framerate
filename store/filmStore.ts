import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type Media } from "@/types";

interface FilmStore {
  films: Media<"movie">[];
  setFilm: (film: Media<"movie">) => void;
}

function enforceUniqueFilms(newFilm: Media<"movie">, films: Media<"movie">[]) {
  const updatedfilms = [...films, newFilm];
  const filmsMap = new Map(updatedfilms.map((film) => [film.id, film]));
  const uniqueFilms = Array.from(filmsMap.values());
  return uniqueFilms;
}

export const useFilmStore = create<FilmStore>()(
  persist(
    (set) => ({
      films: [] as Media<"movie">[],
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
