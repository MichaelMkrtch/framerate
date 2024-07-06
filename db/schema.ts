import {
  bigint,
  bigserial,
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
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.movieId] }),
    };
  },
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSession = typeof sessionsTable.$inferInsert;
export type SelectSession = typeof sessionsTable.$inferSelect;

export type InsertMovie = typeof moviesTable.$inferInsert;
export type SelectMovie = typeof moviesTable.$inferSelect;

export type InsertMovieReview = typeof movieReviewsTable.$inferInsert;
export type SelectMovieReview = typeof movieReviewsTable.$inferSelect;
