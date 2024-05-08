export interface Film {
  id: number;
  title: string;
  directorList: { name: string }[]
  releaseDate: string;
  posterPath: string;
  backdrops: { path: string }[]
}

export interface Results {
  results: Film[]
}