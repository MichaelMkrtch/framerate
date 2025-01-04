"use client";

import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";
import { type Details } from "@/types/tmdb.types";

import { useIdStore } from "@/store/details/idStore";

export default function FilmPage() {
  const [movie, setMovie] = useState<Details<"movie">>();

  const movieId = useIdStore((state) => state.id);
  const detailsList = useFetchDetails([{ mediaType: "movie", id: movieId }]);

  useEffect(() => {
    if (detailsList[0].data) {
      setMovie(detailsList[0].data);
    }
  }, [detailsList]);

  return movie && <p>{movie.title}</p>;
}
