interface TrendingMovie<T> {
  [key: string]: unknown;
  backdropPath: string;
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: T;
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface TrendingTV<T> {
  [key: string]: unknown;
  backdropPath: string;
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: T;
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  originCountry: string[];
}

export interface TrendingPerson<T> {
  [key: string]: unknown;
  id: number;
  name: string;
  originalName: string;
  mediaType: T;
  adult: boolean;
  popularity: number;
  gender: number;
  knownForDepartment: string;
  profilePath: string;
}

export type Trending<T = "movie" | "tv" | "person"> = T extends "movie"
  ? TrendingMovie<T>
  : T extends "tv"
    ? TrendingTV<T>
    : TrendingPerson<T>;
