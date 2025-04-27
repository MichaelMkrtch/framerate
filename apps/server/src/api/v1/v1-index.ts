import { Elysia } from "elysia";
import { trending } from "./trending";
import { details } from "./details";

export const v1 = new Elysia({ prefix: "/v1" }).use(trending).use(details);
