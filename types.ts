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
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Film {
  id: number;
  title: string;
  release_date: string;
  director: string;
  directorList: CrewMember[];
  tagline: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  runtime: number;
  genres: Genre[];
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
}

export interface SearchResults {
  results: Film[];
}
