import { SearchResults } from "@/types";

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
    const results = data.results;
    results.forEach(
      (film) => (film.release_date = film.release_date.slice(0, 4)),
    );

    return results;
  } catch (error) {
    console.log(error);
  }
}
