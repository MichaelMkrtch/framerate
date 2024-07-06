import { type Media } from "@/types";

import { renameKeys } from "@/utils/renameKeys";
import recursiveToCamel from "@/utils/snakeCaseToCamelCase";

const API_TOKEN = process.env.API_TOKEN as string;

export async function fetchTrending(type: string, timeWindow: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const url = `https://api.themoviedb.org/3/trending/${type}/${timeWindow}?language=en-US`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let error = new Error("An error occured while fetching trending data!");
      throw error;
    }

    const data: Record<"results", Media[]> = await response.json();

    const formattedData = recursiveToCamel(data) as Record<"results", Media[]>;

    const results = formattedData.results.map((media) => {
      if (type === "tv") {
        const tvResults = renameKeys(
          { name: "title", firstAirDate: "releaseDate" },
          media,
        ) as Media<"tv">;
        return tvResults;
      } else {
        return media;
      }
    });

    results && results.sort((a, b) => (a!.popularity > b!.popularity ? -1 : 1));

    return results;
  } catch (error) {
    console.log(error);
  }
}
