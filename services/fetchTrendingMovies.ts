import { type SearchResults } from "@/types";

import { recursiveToCamel } from "@/utils/snakeCaseToCamelCase";

const API_TOKEN = process.env.API_TOKEN as string;

export async function fetchTrendingMovies(timeWindow: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let error = new Error("An error occured while fetching trending data!");
      throw error;
    }

    const data: SearchResults = await response.json();

    const formattedData = recursiveToCamel(data) as SearchResults;

    const results = formattedData.results;
    results.forEach(
      (film) => (film.releaseDate = film.releaseDate.slice(0, 4)),
    );

    return results;
  } catch (error) {
    console.log(error);
  }
}
