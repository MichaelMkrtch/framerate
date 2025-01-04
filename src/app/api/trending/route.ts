import type { Trending } from "@/types/tmdb.types";

import { redirect } from "next/navigation";

import { convertToCamelCase, renameKeys } from "@/lib/utils";

const API_TOKEN = process.env.API_TOKEN as string;

type FilterParams = "all" | "movie" | "tv" | "person" | null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filter = searchParams.get("filter") as FilterParams;
  const timeWindow = searchParams.get("timeWindow");

  if (filter && timeWindow) {
    const data = (await fetchTrending(filter, timeWindow)) as Trending[];
    return Response.json(data);
  }
  redirect("/home");
}

async function fetchTrending(
  filter: "all" | "movie" | "tv" | "person",
  timeWindow: string,
): Promise<Trending[] | Error> {
  const url = `https://api.themoviedb.org/3/trending/${filter}/${timeWindow}?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error("An error occured while fetching trending data!");
      throw error;
    }

    const data: Record<"results", Trending[]> = await response.json();
    const camelCaseData = convertToCamelCase(data) as Record<
      "results",
      Trending[]
    >;

    const formattedData = camelCaseData.results.map((media) => {
      if (media.mediaType === "tv") {
        const tvResults = renameKeys(
          {
            name: "title",
            originalName: "originalTitle",
            firstAirDate: "releaseDate",
          },
          media,
        ) as Trending<"tv">;
        return tvResults;
      } else if (media.mediaType === "movie") {
        return media as Trending<"movie">;
      } else {
        return media as Trending<"person">;
      }
    });

    return formattedData;
  } catch (error) {
    // Error will be caught by TanStack Query in fetchRoute()
    throw error;
  }
}
