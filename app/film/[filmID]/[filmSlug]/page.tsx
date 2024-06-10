"use client";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { useParams } from "next/navigation";

import useFetchDetails from "@/hooks/useFetchDetails";

export default function FilmDetailsPage() {
  const params = useParams<{ filmID: string }>();
  const filmID = parseInt(params.filmID);

  const detailsList = useFetchDetails([{ id: filmID }]);
  const fetchedFilm = detailsList[0];

  return (
    fetchedFilm && (
      <>
        <Backdrop
          title={fetchedFilm.title}
          backdrop_path={fetchedFilm.backdrop_path}
        />
        <div className="px-3.5 md:px-0">
          <DetailsSection film={fetchedFilm} />
        </div>
      </>
    )
  );
}
