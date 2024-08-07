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
  tagline: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  popularity: number;
  numberOfSeasons: number;
};

export type SavedContent = {
  mediaType?: string | null;
  id: number;
  title: string;
  rating?: string | null;
  posterPath: string;
  createdAt?: Date;
};

export type Media<T = "movie" | "tv"> = T extends "movie" ? Film<T> : TV<T>;

export type UserList<T> = {
  type: T;
  id: number;
  name: string;
  createdAt: Date;
  userId: number;
} | null;

export type SavedMedia = {
  id?: number;
  listId: number;
  mediaType: string;
  userId?: number;
  movieId: number | null;
  seriesId: number | null;
};

export type SavedMediaResult<T> = {
  type: T;
  id: number;
  userId: number;
  listId: number;
  mediaType: string;
  movieId: number | null;
  seriesId: number | null;
} | null;

export type ListData<T = "list" | "listContent"> = T extends "list"
  ? UserList<T>
  : SavedMediaResult<T>;

export type FormState = {
  status: string;
  message: string;
  data: ListData | null;
};
