import { betterAuth } from "@server/middlewares/auth-middleware";
import { updateReview } from "@server/services/v1/actions";
import Elysia, { t } from "elysia";

export const actions = new Elysia({ name: "actions" }).use(betterAuth).patch(
  "/actions",
  async ({ user, body: { mediaType, mediaId, field, value } }) => {
    if (user) {
      const updatedField = {
        userId: user.id,
        mediaType,
        mediaId,
        field,
        value,
      };
      const result = await updateReview(updatedField);

      return {
        data: result,
        error: null,
      };
    }
  },
  {
    auth: true,
    body: t.Object({
      mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
      mediaId: t.Number(),
      field: t.Union([t.Literal("liked"), t.Literal("watched")]),
      value: t.Boolean(),
    }),
  },
);
