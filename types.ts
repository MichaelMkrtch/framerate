export interface Film {
  id: number;
  title: string;
  directorList: { name: string }[]
  release_date: string;
  poster_path: string;
  backdrops: { path: string }[]
}

export interface Results {
  results: Film[]
}