import { type Media } from "@/types";

import recursiveToCamel from "@/utils/snakeCaseToCamelCase";

const API_TOKEN = process.env.API_TOKEN as string;

type FetchDataParams = {
  signal: AbortSignal;
  query: string;
};

export async function searchMovies({ signal, query }: FetchDataParams) {
  const params = new URLSearchParams({
    query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  });

  let url = `https://api.themoviedb.org/3/search/multi?${params}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    signal: signal,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let error = new Error("An error occured while fetching movie data!");
      throw error;
    }

    const data: Record<"results", Media[]> = await response.json();

    const formattedData = recursiveToCamel(data) as Record<"results", Media[]>;

    const searchResults = formattedData.results.slice(0, 10);

    return searchResults;
  } catch (error) {
    console.log(error);
  }
}
