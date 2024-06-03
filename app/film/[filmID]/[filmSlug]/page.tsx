"use client";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { useFilmStore } from "@/store/filmStore";
import { useParams } from "next/navigation";

export default function FilmDetailsPage() {
  const params = useParams<{ filmID: string }>();
  const filmList = useFilmStore((state) => state.films);

  const film = filmList.filter(
    (film) => film.id === parseInt(params.filmID),
  )[0];

  return (
    film && (
      <>
        <Backdrop title={film.title} backdrop_path={film.backdrop_path} />
        <DetailsSection film={film} />
      </>
    )
  );
}
