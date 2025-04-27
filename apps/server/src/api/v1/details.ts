import { fetchDetails } from "@server/services/v1/fetch-details";
import Elysia, { t } from "elysia";

export const details = new Elysia({ prefix: "/details/:type/:id" })
  .onError(({ code, error }) => {
    console.error(`${code}: Error in details route – ${error}`);
    if (code === "VALIDATION") {
      return {
        status: 400,
        message: "Invaid request",
      };
    } else {
      return {
        status: 500,
        message: "Something went wrong while fetching details data!",
      };
    }
  })
  .get(
    "/",
    async ({ params: { type, id } }) => {
      if (type === "person") {
        throw new Error("Sorry, we don't support people search yet!");
      }

      const data = await fetchDetails(type, id);
      return data;
    },
    {
      params: t.Object({
        type: t.Union([
          t.Literal("movie"),
          t.Literal("tv"),
          t.Literal("person"),
        ]),
        id: t.Number(),
      }),
    },
  );
