import { betterAuth } from "@server/middlewares/auth-middleware";
import {
  addReview,
  deleteReview,
  getAvgRating,
  getReview,
} from "@server/services/v1/reviews";
import Elysia, { t } from "elysia";

const reviewParams = t.Object({
  mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
  mediaId: t.Number(),
});

export const reviews = new Elysia({ name: "reviews", prefix: "reviews" })
  .use(betterAuth)
  // gets user review
  .get(
    "/:mediaType/:mediaId",
    async ({ user, params: { mediaType, mediaId } }) => {
      if (user) {
        const result = await getReview(user.id, mediaType, mediaId);

        if (!result) {
          return {
            data: null,
            error: { code: 500, message: "Failed to get review data!" },
          };
        }

        return {
          data: result,
          error: null,
        };
      } else {
        return {
          data: null,
          error: { code: 401, message: "Please login or signup to continue" },
        };
      }
    },
    {
      auth: true,
      params: t.Object({
        mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
        mediaId: t.Number(),
      }),
    },
  )
  // creates user review
  .post(
    "/:mediaType/:mediaId",
    async ({ user, params: { mediaType, mediaId }, body: { rating } }) => {
      if (user) {
        const reviewData = { userId: user.id, mediaType, mediaId, rating };
        const result = await addReview(reviewData);
        return {
          data: result,
          error: null,
        };
      }
    },
    {
      auth: true,
      params: t.Object({
        mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
        mediaId: t.Number(),
      }),
      body: t.Object({
        rating: t.String(),
      }),
    },
  )
  // deletes user review
  .delete(
    "/:mediaType/:mediaId",
    async ({ user, params: { mediaType, mediaId } }) => {
      if (user) {
        const result = await deleteReview(user.id, mediaId, mediaType);
        return {
          data: "success",
          error: null,
        };
      }
    },
    {
      auth: true,
      params: t.Object({
        mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
        mediaId: t.Number(),
      }),
    },
  )
  // gets average rating
  .get(
    "/:mediaType/:mediaId/average",
    async ({ params: { mediaType, mediaId } }) => {
      const result = await getAvgRating(mediaType, mediaId);

      if (!result) {
        return {
          data: null,
          error: { code: 500, message: "Failed to get average rating!" },
        };
      }

      return {
        data: result,
        error: null,
      };
    },
    {
      params: t.Object({
        mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
        mediaId: t.Number(),
      }),
    },
  );
