interface TrendingMovie {
  [key: string]: unknown;
  backdropPath: string;
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: "movie";
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface TrendingTV {
  [key: string]: unknown;
  backdropPath: string;
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: "tv";
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  originCountry: string[];
}

export interface TrendingPerson {
  [key: string]: unknown;
  id: number;
  name: string;
  originalName: string;
  mediaType: "person";
  adult: boolean;
  popularity: number;
  gender: number;
  knownForDepartment: string;
  profilePath: string;
}

export type Trending<T = "movie" | "tv" | "person"> = T extends "movie"
  ? TrendingMovie
  : T extends "tv"
    ? TrendingTV
    : TrendingPerson;
