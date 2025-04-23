import { Elysia } from "elysia";
import { films } from "./film/films";
import { trending } from "./trending/trending";

export const apiV1 = new Elysia({ prefix: "/v1" }).use(trending).use(films);
