import {
  bigint,
  boolean,
  date,
  numeric,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  username: text("username").notNull().unique(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
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
    id: bigint("id", { mode: "number" }),
    userId: text("userId")
      .notNull()
      .references(() => user.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    movieId: bigint("movie_id", { mode: "number" })
      .notNull()
      .references(() => moviesTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    ratedAt: timestamp("rated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type").notNull(),
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
    id: bigint("id", { mode: "number" }),
    userId: text("userId")
      .notNull()
      .references(() => user.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    seriesId: bigint("series_id", { mode: "number" })
      .notNull()
      .references(() => tvShowsTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    ratedAt: timestamp("rated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type").notNull(),
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
  id: bigint("id", { mode: "number" }),
  userId: text("userId")
    .notNull()
    .references(() => user.id, {
      onUpdate: "no action",
      onDelete: "no action",
    }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const listContentTable = pgTable("list_content", {
  id: bigint("id", { mode: "number" }).notNull(),
  userId: text("user_id").notNull(),
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
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export type InsertSession = typeof session.$inferInsert;
export type SelectSession = typeof session.$inferSelect;

export type InsertAccount = typeof account.$inferInsert;
export type SelectAccount = typeof account.$inferSelect;

export type InsertVerification = typeof verification.$inferInsert;
export type SelectVerification = typeof verification.$inferSelect;

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
