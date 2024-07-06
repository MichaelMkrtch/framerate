"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import { pick } from "@/utils/pickProperties";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { createMovie, getMovie } from "@/lib/movie";
import { getAvgMovieRating } from "@/lib/movieReview";

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
};

export type StoredRating = {
  avgRating: number;
  reviewCount: number;
};

export default function FilmDetailsPage() {
  const [movie, setMovie] = useState<Movie>();
  const [storedRating, setStoredRating] = useState<StoredRating>();

  const params = useParams<{ filmID: string }>();

  const filmId = parseInt(params.filmID);

  const detailsList = useFetchDetails([{ mediaType: "movie", id: filmId }]);
  const fetchedMovie = detailsList[0];

  useEffect(() => {
    (async () => {
      if (fetchedMovie && fetchedMovie.mediaType === "movie") {
        const film =
          fetchedMovie &&
          pick(
            fetchedMovie,
            "id",
            "title",
            "posterPath",
            "backdropPath",
            "releaseDate",
            "runtime",
          );

        film && (await createMovie(film));

        const result = await getMovie({ movieId: filmId });
        if (result.length > 0) {
          setMovie(result[0]);
        }

        const average = await getAvgMovieRating({ movieId: filmId });
        if (average.length > 0) {
          setStoredRating(average[0]);
        }
      }
    })();
  }, [filmId, fetchedMovie]);

  return (
    movie &&
    fetchedMovie && (
      <>
        <Backdrop title={movie.title} backdropPath={movie.backdropPath} />
        <div className="px-3.5 md:px-0">
          <DetailsSection
            media={fetchedMovie}
            storedRating={storedRating}
            title={movie.title}
            posterPath={movie.posterPath}
          />
        </div>
      </>
    )
  );
}
