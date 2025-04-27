import { generateSlug } from "@server/lib/slug";
import { betterAuth } from "@server/middlewares/auth-middleware";
import { clientListSchema } from "@server/schemas/v1/list-schema";
import { createList, getLists } from "@server/services/v1/list";
import Elysia, { t } from "elysia";

export const lists = new Elysia({ name: "lists" })
  .use(betterAuth)
  .onError(({ code, error }) => {
    console.error("Error in collections route:", error);

    if (code === 400) {
      return { status: code, message: "Invalid list name" };
    } else if (code === 401) {
      return {
        status: code,
        message: "Please create an account or log in to continue.",
      };
    } else {
      return {
        status: code ?? 500,
        message: "Something went wrong while fetching collections data!",
      };
    }
  })
  .get(
    "/lists",
    async ({ user }) => {
      if (user) {
        const lists = await getLists(user.id);

        return { data: lists, error: null };
      } else {
        return {
          data: null,
          error: { code: 401, message: "Please login or signup to continue" },
        };
      }
    },
    {
      auth: true,
    },
  )
  .post(
    "/lists",
    async ({ user, body, error }) => {
      const parsed = clientListSchema.safeParse(body);

      if (!parsed.success) {
        console.error(
          "Zod validation failed. Input:",
          JSON.stringify(body.listName, null, 2),
        );
        console.error("Zod errors:", parsed.error.flatten());
        throw error(400);
      }

      const { listName } = parsed.data;

      if (user) {
        const slug = await generateSlug(listName, "list", user.id);

        const results = await createList({
          userId: user.id,
          name: listName,
          slug,
        });

        return results;
      } else {
        throw error(401);
      }
    },
    {
      auth: true,
      body: t.Object({
        listName: t.String(),
      }),
    },
  );
