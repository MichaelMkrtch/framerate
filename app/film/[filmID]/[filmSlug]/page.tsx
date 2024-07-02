"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { getMovie } from "@/lib/movie";

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
    async () => {
      const result = await getMovie({ movieId: filmID });
      if (result.length > 0) {
        console.log(result[0]);
        setMovie(result[0]);
      }
    };
  }, [filmID]);

  return (
    fetchedFilm && (
      <>
        <Backdrop
          title={movie ? movie.title : fetchedFilm.title}
          backdrop_path={movie ? movie.backdropPath : fetchedFilm.backdrop_path}
        />
        <div className="px-3.5 md:px-0">
          <DetailsSection
            film={fetchedFilm}
            posterPath={movie ? movie.posterPath : null}
          />
        </div>
      </>
    )
  );
}
