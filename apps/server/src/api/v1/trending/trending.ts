import { Elysia, t } from "elysia";
import { fetchTrending } from "./fetchTrending";

export const trending = new Elysia({ prefix: "/trending" })
  .onError(({ error }) => {
    console.error("Error in trending route:", error);
    return {
      status: 500,
      message: "Something went wrong while fetching trending data!",
    };
  })
  .get(
    "/",
    async ({ query }) => {
      const { filter, timeWindow } = query;
      const data = await fetchTrending(filter, timeWindow);
      return data;
    },
    {
      query: t.Object({
        filter: t.Union([
          t.Literal("all"),
          t.Literal("movie"),
          t.Literal("tv"),
          t.Literal("person"),
        ]),
        timeWindow: t.Union([t.Literal("day"), t.Literal("week")]),
      }),
    },
  );
