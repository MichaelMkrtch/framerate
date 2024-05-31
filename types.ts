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
  known_for_department: string;
}

export interface Film {
  id: number;
  title: string;
  director: string;
  cast: CastMember[];
  crew: CrewMember[];
  release_date: string;
  poster_path: string;
  backdrop_path: { path: string }[];
}

export interface Results {
  results: Film[];
}
