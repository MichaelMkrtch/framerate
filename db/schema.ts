import {
  bigint,
  bigserial,
  boolean,
  date,
  numeric,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => usersTable.id, {
      onUpdate: "no action",
      onDelete: "no action",
    }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const moviesTable = pgTable("movies", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  posterPath: text("poster_path").notNull(),
  backdropPath: text("backdrop_path").notNull(),
  releaseDate: date("release_date").notNull(),
  runtime: smallint("runtime").notNull(),
});

export const movieReviewsTable = pgTable(
  "movie_reviews",
  {
    id: bigserial("id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => usersTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    movieId: bigint("movie_id", { mode: "number" })
      .notNull()
      .references(() => moviesTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    ratedAt: timestamp("rated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type"),
    liked: boolean("liked"),
    watched: boolean("watched"),
    review: text("review"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.movieId] }),
    };
  },
);

export const tvShowsTable = pgTable("tv_shows", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  posterPath: text("poster_path").notNull(),
  backdropPath: text("backdrop_path").notNull(),
  releaseDate: date("release_date").notNull(),
});

export const tvReviewsTable = pgTable(
  "tv_reviews",
  {
    id: bigserial("id", { mode: "number" }),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => usersTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    seriesId: bigint("series_id", { mode: "number" })
      .notNull()
      .references(() => tvShowsTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    ratedAt: timestamp("rated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type"),
    liked: boolean("liked"),
    watched: boolean("watched"),
    review: text("review"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.seriesId] }),
    };
  },
);

export const listsTable = pgTable("lists", {
  id: bigserial("id", { mode: "number" }),
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => usersTable.id, {
      onUpdate: "no action",
      onDelete: "no action",
    }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const listContentTable = pgTable("list_content", {
  id: bigserial("id", { mode: "number" }).notNull(),
  userId: bigint("user_id", { mode: "number" }).notNull(),
  listId: bigint("list_id", { mode: "number" }).notNull(),
  movieId: bigint("movie_id", { mode: "number" }).references(
    () => moviesTable.id,
    {
      onUpdate: "no action",
      onDelete: "no action",
    },
  ),
  seriesId: bigint("series_id", { mode: "number" }).references(
    () => tvShowsTable.id,
    {
      onUpdate: "no action",
      onDelete: "no action",
    },
  ),
  mediaType: text("media_type").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export type InsertMovieReview = typeof movieReviewsTable.$inferInsert;
export type SelectMovieReview = typeof movieReviewsTable.$inferSelect;

export type InsertShow = typeof tvShowsTable.$inferInsert;
export type SelectShow = typeof tvShowsTable.$inferSelect;

export type InsertShowReview = typeof tvReviewsTable.$inferInsert;
export type SelectShowReview = typeof tvReviewsTable.$inferSelect;

export type InsertList = typeof listsTable.$inferInsert;
export type SelectList = typeof listsTable.$inferSelect;

export type InsertListContent = typeof listContentTable.$inferInsert;
export type SelectListContent = typeof listContentTable.$inferSelect;
