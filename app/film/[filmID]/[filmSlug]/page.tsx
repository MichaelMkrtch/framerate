"use client";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { useParams } from "next/navigation";

import useFetchDetails from "@/hooks/useFetchDetails";

export default function FilmDetailsPage() {
  const params = useParams<{ filmID: string }>();
  const filmID = parseInt(params.filmID);

  const detailsList = useFetchDetails([{ id: filmID }]);
  const film = detailsList[0];

  return (
    film && (
      <>
        <Backdrop title={film.title} backdrop_path={film.backdrop_path} />
        <DetailsSection film={film} />
      </>
    )
  );
}
