export type Trending<T = 'all' | 'movie' | 'tv' | 'person'> = T extends 'all'
  ? TrendingMedia
  : T extends 'movie'
    ? TrendingMovie
    : T extends 'tv'
      ? TrendingTV
      : TrendingPerson;

type MediaBase = {
  adult: boolean;
  backdropPath: string | null;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  voteAverage: number;
  voteCount: number;
};

type TrendingMovie = MediaBase & {
  mediaType: 'movie';
  video: boolean;
};

type TrendingTV = MediaBase & {
  mediaType: 'tv';
  originCountry: string[];
};

type TrendingPerson = {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  mediaType: 'person';
  name: string;
  originalName: string;
  popularity: number;
  profilePath?: string;
};

type TrendingMedia = TrendingMovie | TrendingTV;
