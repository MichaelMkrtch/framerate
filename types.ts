export interface CastMember extends Credit {
  character: string;
}

export interface CrewMember extends Credit {
  department: string;
  job: string;
}

interface Credit {
  id: number;
  name: string;
  profilePath: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Film {
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
  belongsToCollection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
}

export interface SearchResults {
  results: Film[];
}

export type Review = {
  id: number;
  title: string;
  rating: string | null;
  posterPath: string;
  createdAt: Date;
};
