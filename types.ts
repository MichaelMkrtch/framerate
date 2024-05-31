export interface Film {
  id: number;
  title: string;
  director_list: { name: string }[];
  release_date: string;
  poster_path: string;
  backdrop_path: { path: string }[];
}

export interface Results {
  results: Film[];
}

interface Credit {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
}

export interface CastMember extends Credit {
  character: string;
}

export interface CrewMember extends Credit {
  department: string;
  job: string;
}