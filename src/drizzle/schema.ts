import {
  bigint,
  bigserial,
  boolean,
  date,
  numeric,
  pgTable,
  primaryKey,
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

export const movieTable = pgTable("movie", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  posterPath: text("poster_path").default(""),
  backdropPath: text("backdrop_path").default(""),
  releaseDate: date("release_date").notNull(),
  slug: text("slug").unique(),
});

export const movieReviewTable = pgTable(
  "movie_review",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    movieId: bigint("movie_id", { mode: "number" })
      .notNull()
      .references(() => movieTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type").notNull(),
    liked: boolean("liked").notNull().default(false),
    watched: boolean("watched").notNull().default(false),
    review: text("review"),
  },
  (table) => [primaryKey({ columns: [table.userId, table.movieId] })],
);

export const tvShowTable = pgTable("tv_show", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  title: text("title").notNull(),
  posterPath: text("poster_path").default(""),
  backdropPath: text("backdrop_path").default(""),
  releaseDate: date("release_date").notNull(),
  slug: text("slug").unique(),
});

export const tvReviewTable = pgTable(
  "tv_review",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    seriesId: bigint("series_id", { mode: "number" })
      .notNull()
      .references(() => tvShowTable.id, {
        onUpdate: "no action",
        onDelete: "no action",
      }),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    mediaType: text("media_type").notNull(),
    liked: boolean("liked").notNull().default(false),
    watched: boolean("watched").notNull().default(false),
    review: text("review"),
  },
  (table) => [primaryKey({ columns: [table.userId, table.seriesId] })],
);

export const listTable = pgTable("list", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
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
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  slug: text("slug").notNull().unique(),
});

export const listItemTable = pgTable("list_item", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("userId").notNull(),
  listId: bigint("list_id", { mode: "number" }).notNull(),
  movieId: bigint("movie_id", { mode: "number" }).references(
    () => movieTable.id,
    {
      onUpdate: "no action",
      onDelete: "no action",
    },
  ),
  seriesId: bigint("series_id", { mode: "number" }).references(
    () => tvShowTable.id,
    {
      onUpdate: "no action",
      onDelete: "no action",
    },
  ),
  mediaType: text("media_type").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export type InsertSession = typeof session.$inferInsert;
export type SelectSession = typeof session.$inferSelect;

export type InsertAccount = typeof account.$inferInsert;
export type SelectAccount = typeof account.$inferSelect;

export type InsertVerification = typeof verification.$inferInsert;
export type SelectVerification = typeof verification.$inferSelect;

export type InsertMovie = typeof movieTable.$inferInsert;
export type SelectMovie = typeof movieTable.$inferSelect;

export type InsertMovieReview = typeof movieReviewTable.$inferInsert;
export type SelectMovieReview = typeof movieReviewTable.$inferSelect;

export type InsertShow = typeof tvShowTable.$inferInsert;
export type SelectShow = typeof tvShowTable.$inferSelect;

export type InsertShowReview = typeof tvReviewTable.$inferInsert;
export type SelectShowReview = typeof tvReviewTable.$inferSelect;

export type InsertList = typeof listTable.$inferInsert;
export type SelectList = typeof listTable.$inferSelect;

export type InsertListItem = typeof listItemTable.$inferInsert;
export type SelectListItem = typeof listItemTable.$inferSelect;
