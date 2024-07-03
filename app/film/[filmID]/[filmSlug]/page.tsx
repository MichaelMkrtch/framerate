"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import { pick } from "@/utils/pickProperties";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { createMovie, getMovie } from "@/lib/movie";

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  averageRating: string | null;
  releaseDate: string;
  runtime: number;
};

export default function FilmDetailsPage() {
  const [movie, setMovie] = useState<Movie>();

  const params = useParams<{ filmID: string }>();
  const filmID = parseInt(params.filmID);

  const detailsList = useFetchDetails([{ id: filmID }]);
  const fetchedFilm = detailsList[0];

  useEffect(() => {
    (async () => {
      const film =
        fetchedFilm &&
        pick(
          fetchedFilm,
          "id",
          "title",
          "posterPath",
          "backdropPath",
          "releaseDate",
          "runtime",
        );
      film && (await createMovie(film));
      const result = await getMovie({ movieId: filmID });
      if (result.length > 0) {
        setMovie(result[0]);
      }
    })();
  }, [filmID, fetchedFilm]);

  return (
    movie &&
    fetchedFilm && (
      <>
        (
        <Backdrop title={movie.title} backdrop_path={movie.backdropPath} />)
        <div className="px-3.5 md:px-0">
          <DetailsSection
            film={fetchedFilm}
            title={movie.title}
            posterPath={movie.posterPath}
          />
        </div>
      </>
    )
  );
}
