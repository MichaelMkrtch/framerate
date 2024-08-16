"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import { pick } from "@/utils/pickProperties";

import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { createMovie, getMovie } from "@/lib/movie";
import { getAvgRating } from "@/lib/reviewCard";
import { useReviewStore } from "@/store/reviewStore";

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
};

export default function FilmDetailsPage() {
  const [movie, setMovie] = useState<Movie>();
  const { setStoredRating } = useReviewStore((state) => ({
    setStoredRating: state.setStoredRating,
  }));

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

        const average = await getAvgRating(fetchedMovie.mediaType, filmId);
        if (average.length > 0) {
          setStoredRating(average[0]);
        }
      }
    })();
  }, [filmId, fetchedMovie, setStoredRating]);

  return (
    movie &&
    fetchedMovie && (
      <>
        <Backdrop
          title={movie.title}
          backdropPath={movie.backdropPath}
          topPosition="top-1"
        />
        <div className="px-3.5 md:px-0">
          <DetailsSection
            media={fetchedMovie}
            title={movie.title}
            posterPath={movie.posterPath}
          />
        </div>
      </>
    )
  );
}
