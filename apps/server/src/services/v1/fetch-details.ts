import { objectToCamel } from "ts-case-convert";

import { formatNames, renameKeys } from "@server/lib/utils";

import type {
  MovieDetails,
  TVDetails,
} from "@server/schemas/v1/details-schema";

import { combinedMediaDetailsSchema } from "@server/schemas/v1/details-schema";
import { ZodError } from "zod";
import { addMovieToDB, getMovieMedia } from "@server/db/movie";

const API_TOKEN = process.env.API_TOKEN as string;

type TMDBError = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export async function fetchDetails(mediaType: "movie" | "tv", id: number) {
  if (mediaType !== "movie" && mediaType !== "tv") {
    throw new Error(`Unsupported media type: ${mediaType}`);
  }

  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits&language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = `TMDB API Error: ${response.status} ${response.statusText}`;
      try {
        const tmdbError = (await response.json()) as TMDBError;
        errorMessage = `TMDB API Error: ${tmdbError.status_code} – ${tmdbError.status_message}`;
      } catch (jsonError) {
        // Ignore JSON parsing error if the response wasn't JSON
      }
      throw new Error(errorMessage);
    }

    const rawData = await response.json();

    const dataWithMediaType = {
      ...(rawData as object),
      media_type: mediaType,
    };

    const validationResult =
      combinedMediaDetailsSchema.safeParse(dataWithMediaType);

    if (!validationResult.success) {
      console.error(
        "Zod validation failed. Input:",
        JSON.stringify(dataWithMediaType, null, 2),
      );
      console.error("Zod errors:", validationResult.error.flatten());
      throw new Error(
        `Invalid data received from TMDB API: ${validationResult.error.message}`,
      );
    }

    const validatedData = validationResult.data;

    if (validatedData.media_type === "movie") {
      let storedMovie = await getMovieMedia(id);

      if (!storedMovie) {
        const movieToAdd = {
          id,
          title: validatedData.title,
          posterPath: validatedData.poster_path,
          backdropPath: validatedData.backdrop_path,
          releaseDate: validatedData.release_date,
        };
        storedMovie = await addMovieToDB(movieToAdd);
      }

      const movieData: MovieDetails = validatedData;

      // format director field so it is ready to use on client rather than list

      const directorList = movieData.credits.crew.filter(
        (crewMember) => crewMember.job === "Director",
      );

      const director = formatNames(directorList);

      const finalMovieData = {
        ...movieData,
        director,
        director_list: directorList,
        poster_path: storedMovie?.posterPath ?? movieData.poster_path,
        backdrop_path: storedMovie?.backdropPath ?? movieData.backdrop_path,
      };

      const movieResults = objectToCamel(finalMovieData);

      return movieResults;
    } else {
      const tvData: TVDetails = validatedData;

      const creatorList = tvData.created_by;

      const creator = formatNames(creatorList);

      const { created_by, ...restOfTvData } = tvData;
      const tvDataBase = {
        ...restOfTvData,
        creator,
        creator_list: creatorList,
      };

      const renamedTvData = renameKeys(
        {
          name: "title",
          original_name: "originalTitle",
          first_air_date: "releaseDate",
        },
        tvDataBase,
      );

      const tvResults = objectToCamel(renamedTvData);

      return tvResults;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Error during Zod parsing:", error.flatten());
    } else {
      console.error("Error in fetchDetails:", error);
    }
    throw error;
  }
}
