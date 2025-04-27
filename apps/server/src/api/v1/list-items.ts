import { betterAuth } from "@server/middlewares/auth-middleware";
import { clientListItemSchema } from "@server/schemas/v1/list-schema";
import { addListItem, deleteListItem } from "@server/services/v1/list";
import Elysia, { t } from "elysia";

export const listItems = new Elysia({ name: "list-items" })
  .use(betterAuth)
  .post(
    "/list-items",
    async ({ user, body }) => {
      const parsed = clientListItemSchema.safeParse(body);

      if (!parsed.success) {
        return {
          data: null,
          error: {
            code: 400,
            message: "Please provide valid list items",
          },
        };
      }

      if (user) {
        const { listId, mediaType, mediaId } = body;

        const result = await addListItem({
          listId,
          mediaType,
          movieId: mediaType === "movie" ? mediaId : null,
          seriesId: mediaType === "tv" ? mediaId : null,
          userId: user.id,
        });

        if (!result) {
          return {
            data: null,
            error: {
              code: 500,
              message: "Failed to add list item! Please try again later",
            },
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
      body: t.Object({
        mediaType: t.Union([t.Literal("movie"), t.Literal("tv")]),
        listId: t.Number(),
        mediaId: t.Number(),
      }),
    },
  )
  .delete(
    "/list-items/:id",
    async ({ user, params: { id } }) => {
      if (user) {
        const result = await deleteListItem(id);

        if (!result) {
          return {
            data: null,
            error: {
              code: 500,
              message: "Failed to delete list item! Please try again later",
            },
          };
        }

        return {
          data: null,
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
        id: t.Number(),
      }),
    },
  );
