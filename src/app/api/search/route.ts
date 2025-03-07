import { NextResponse } from "next/server";

import { Media } from "@/types/tmdb.types";

import { convertToCamelCase } from "@/lib/utils";

type GetApiResponse = {
  message: string;
  results?: Media[];
  error?: string;
};

const API_TOKEN = process.env.API_TOKEN as string;

type FetchDataParams = {
  signal: AbortSignal;
  query: string;
};

export async function GET(
  request: Request,
): Promise<NextResponse<GetApiResponse>> {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const signal = request.signal;

    if (query) {
      const data = await searchMedia({ signal, query });

      return NextResponse.json(
        { message: "Search successful", results: data },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Invalid search query" },
        { status: 400 },
      );
    }
  } catch (error) {
    // Error will be caught by TanStack Query in useSearch hook
    throw error;
  }

  async function searchMedia({ signal, query }: FetchDataParams) {
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
        const error = new Error("An error occured while fetching movie data!");
        throw error;
      }

      const data: Record<"results", Media[]> = await response.json();

      const formattedData = convertToCamelCase(data) as Record<
        "results",
        Media[]
      >;

      const searchResults = formattedData.results.slice(0, 10);

      return searchResults;
    } catch (error) {
      console.log(error);
    }
  }
}
