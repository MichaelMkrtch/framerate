import { auth } from "@server/lib/auth";
import { betterAuth } from "@server/middlewares/auth-middleware";
import { getListData } from "@server/services/v1/lists";
import Elysia, { t } from "elysia";

export const user = new Elysia({ name: "user", prefix: "/user" })
  .use(betterAuth)
  .get(
    "/:username/collections/:slug",
    async ({ headers, params: { username, slug } }) => {
      const reqHeaders = headers as any as Headers;
      const session = await auth.api.getSession({ headers: reqHeaders });
      const results = await getListData(username, slug, session?.user);

      return results;
    },
    {
      params: t.Object({
        username: t.String(),
        slug: t.String(),
      }),
    },
  );
