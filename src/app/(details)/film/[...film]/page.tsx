"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useFetchDetails from "@/hooks/useFetchDetails";
import { Details } from "@/types/tmdb.types";

import Backdrop from "@/components/Backdrop";
import MediaDetails from "@/features/details/components/MediaDetails";
import { createMovie, getMovie } from "@/features/details/server/db/movie";
import { pick } from "@/lib/utils";

type MovieFromDB = Pick<
  Details<"movie">,
  "id" | "title" | "posterPath" | "backdropPath" | "releaseDate"
>;

export default function FilmPage() {
  const [movie, setMovie] = useState<MovieFromDB>();

  const { film } = useParams<{ film: [string, string] }>();
  const movieId = parseInt(film[0]);

  const details = useFetchDetails([{ mediaType: "movie", id: movieId }])[0];
  const fetchedMovie = details.data;

  useEffect(() => {
    (async () => {
      const storedMovie = await getMovie(movieId);
      if (storedMovie) setMovie(storedMovie);

      if (!storedMovie && fetchedMovie && fetchedMovie.mediaType === "movie") {
        const movieToCreate = pick(
          fetchedMovie,
          "id",
          "title",
          "posterPath",
          "backdropPath",
          "releaseDate",
        );

        const storedMovie = movieToCreate && (await createMovie(movieToCreate));
        if (storedMovie) setMovie(storedMovie);
      }
    })();
  }, [movieId, fetchedMovie]);

  return (
    fetchedMovie &&
    movie && (
      <>
        <main className="relative pb-32">
          <Backdrop
            alt={`Still image from ${movie.title}`}
            backdropPath={movie.backdropPath ?? ""}
          />
          <MediaDetails
            media={fetchedMovie}
            title={fetchedMovie.title}
            posterPath={movie.posterPath}
          />
        </main>
      </>
    )
  );
}
