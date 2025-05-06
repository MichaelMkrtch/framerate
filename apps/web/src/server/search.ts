import type { SearchResults } from "@web/types/search";

import { createServerFn } from "@tanstack/react-start";

import { objectToCamel } from "ts-case-convert";

const API_TOKEN = process.env.API_TOKEN as string;

export const searchMedia = createServerFn({ method: "GET" })
  .validator((query: string) => query)
  .handler(async ({ signal, data }) => {
    if (signal.aborted) {
      return;
    }

    const query = data;

    const params = new URLSearchParams({
      query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    });

    const url = `https://api.themoviedb.org/3/search/multi?${params}`;

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
        throw new Error("An error occured while searching!");
      }

      const rawData = (await response.json()) as unknown as SearchResults;

      const transformedData = objectToCamel(rawData);

      const searchResults = transformedData.results.slice(0, 10);

      const filteredResults = searchResults.filter(
        (result) => result.mediaType !== "person",
      );

      return filteredResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
