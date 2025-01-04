export type Trending<T = "movie" | "tv" | "person"> = T extends "movie"
  ? TrendingMovie
  : T extends "tv"
    ? TrendingTV
    : TrendingPerson;

export type Details<T = "movie" | "tv"> = T extends "movie"
  ? MovieDetails
  : TVDetails;

type MediaBase = {
  adult: boolean;
  backdropPath?: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath?: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
  voteCount: number;
};

type TrendingMovie = MediaBase & {
  mediaType: "movie";
  video: boolean;
};

type TrendingTV = MediaBase & {
  mediaType: "tv";
  originCountry: string[];
};

type TrendingPerson = {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  mediaType: "person";
  name: string;
  originalName: string;
  popularity: number;
  profilePath?: string;
};

type MediaDetails = {
  credits: { cast: Cast[]; crew: Crew[] };
  genres: Genre[];
  homepage?: string;
  originCountry: string[];
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
};

type MovieDetails = Omit<MediaBase, "genreIds"> &
  MediaDetails & {
    belongsToCollection?: BelongsToCollection;
    budget: number;
    director: string;
    directorList: Crew[];
    imdbId: string;
    mediaType: "movie";
    revenue: number;
    runtime: number;
    video: boolean;
  };

type TVDetails = Omit<MediaBase, "genreIds"> &
  MediaDetails & {
    creator: string;
    createdByList: CreatedBy[];
    episodeRunTime?: unknown[];
    firstAirDate: string;
    inProduction: boolean;
    languages: string[];
    lastAirDate: string;
    lastEpisodeToAir: LastEpisodeToAir;
    mediaType: "tv";
    name: string;
    nextEpisodeToAir?: NextEpisodeToAir;
    networks: Network[];
    numberOfEpisodes: number;
    numberOfSeasons: number;
    originalName: string;
    seasons: Season[];
    type: string;
  };

type BelongsToCollection = {
  id: number;
  name: string;
  posterPath?: string;
  backdropPath?: string;
};

export type CreatedBy = {
  id: number;
  creditId: string;
  name: string;
  originalName: string;
  gender: number;
  profilePath?: string;
};

export type Credits = {
  adult: boolean;
  creditId: string;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath?: string;
};

type Cast = Credits & {
  castId: number;
  character: string;
  order: number;
};

export type Crew = Credits & {
  department: string;
  job: string;
};

type Genre = {
  id: number;
  name: string;
};

type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  airDate: string;
  episodeNumber: number;
  episodeType: string;
  productionCode: string;
  runtime: number;
  seasonNumber: number;
  showId: number;
  stillPath?: string;
};

type Network = {
  id: number;
  logoPath?: string;
  name: string;
  originCountry: string;
};

type NextEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  airDate: string;
  episodeNumber: number;
  episodeType: string;
  productionCode: string;
  runtime: number;
  seasonNumber: number;
  showId: number;
  stillPath?: string;
};

type ProductionCompany = {
  id: number;
  logoPath?: string;
  name: string;
  originCountry: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type Season = {
  airDate?: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath?: string;
  seasonNumber: number;
  voteAverage: number;
};

type SpokenLanguage = {
  englishName: string;
  iso_639_1: string;
  name: string;
};
