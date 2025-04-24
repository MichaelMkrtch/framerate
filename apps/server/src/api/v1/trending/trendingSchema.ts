import { z } from "zod";

const mediaBaseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

const trendingMovieSchema = mediaBaseSchema.extend({
  media_type: z.literal("movie"),
  original_title: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
});

const trendingTVSchema = mediaBaseSchema.extend({
  media_type: z.literal("tv"),
  first_air_date: z.string(),
  name: z.string(),
  origin_country: z.array(z.string()),
  original_name: z.string(),
});

const trendingPersonSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  media_type: z.literal("person"),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().optional().nullable(),
});

export const trendingSchema = z.union([
  trendingMovieSchema,
  trendingTVSchema,
  trendingPersonSchema,
]);

export const trendingResponseSchema = z.object({
  page: z.number(),
  results: z.array(trendingSchema),
  total_pages: z.number(),
  total_results: z.number(),
});
