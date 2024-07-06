export interface Credit {
  id: number;
  name: string;
  profilePath: string;
}

export interface CastMember extends Credit {
  character: string;
}

export interface CrewMember extends Credit {
  department: string;
  job: string;
}

interface Genre {
  id: number;
  name: string;
}

interface BelongToCollection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
}

type Film<T> = {
  mediaType: T;
  id: number;
  title: string;
  releaseDate: string;
  director: string;
  directorList: CrewMember[];
  tagline: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  runtime: number;
  genres: Genre[];
  belongsToCollection: BelongToCollection;
  popularity: number;
};

type TV<T> = {
  mediaType: T;
  id: number;
  title: string;
  creator: string;
  createdByList: Credit[];
  tagline?: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  popularity: number;
  numberOfSeasons: number;
};

export type Review = {
  mediaType: string | null;
  id: number;
  title: string;
  rating: string | null;
  posterPath: string;
  createdAt: Date;
};

export type Media<T = "movie" | "tv"> = T extends "movie" ? Film<T> : TV<T>;
