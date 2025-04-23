import { Elysia } from "elysia";

export const films = new Elysia({ prefix: "/films" }).get(
  "/:id/:title",
  () => "Films!",
);
