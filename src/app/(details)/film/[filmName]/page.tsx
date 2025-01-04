"use client";

import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";
import { type Details } from "@/types/tmdb.types";

import { useIdStore } from "@/store/details/idStore";

export default function FilmPage() {
  const [film, setFilm] = useState<Details<"movie">>();

  const filmId = useIdStore((state) => state.id);
  const detailsList = useFetchDetails([{ mediaType: "movie", id: filmId }]);

  useEffect(() => {
    if (detailsList[0].data) {
      setFilm(detailsList[0].data);
    }
  }, [detailsList]);

  return film && <p>{film.title}</p>;
}
