import { Elysia } from "elysia";
import { trending } from "./trending";
import { details } from "./details";
import { lists } from "./lists";
import { listItems } from "./list-items";

export const v1 = new Elysia({ name: "apiV1", prefix: "/v1" })
  .use(trending)
  .use(details)
  .use(lists)
  .use(listItems);
