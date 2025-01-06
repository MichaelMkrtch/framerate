import type { Details } from "@/types/tmdb.types";

import { redirect } from "next/navigation";

import { convertToCamelCase, formatNames, renameKeys } from "@/lib/utils";

const API_TOKEN = process.env.API_TOKEN as string;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mediaType = searchParams.get("type") as "movie" | "tv";
  const idString = searchParams.get("id");

  if (mediaType && idString) {
    const id = parseInt(idString);
    const data = await fetchDetails(mediaType, id);

    return Response.json(data);
  }

  if (!mediaType || !idString) {
    throw new Error("Invalid media type or ID");
  }

  redirect("/");
}

async function fetchDetails(
  mediaType: "movie" | "tv",
  id: number,
): Promise<Details | Error> {
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits&language=en-US`;

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
      const error = new Error("An error occured while fetching details!");
      throw error;
    }

    const data: Details = await response.json();
    const camelCaseData = convertToCamelCase(data) as Details;

    if (mediaType === "movie") {
      camelCaseData.mediaType = "movie";
    } else if (mediaType === "tv") {
      camelCaseData.mediaType = "tv";
    }

    if (camelCaseData.mediaType === "movie") {
      camelCaseData.directorList = camelCaseData.credits.crew.filter(
        (crewMember) => crewMember.job === "Director",
      );

      const { directorList } = camelCaseData;

      const updatedData = formatNames(directorList, camelCaseData);

      return updatedData;
    }

    // mediaType is tv
    const tvResults = renameKeys(
      {
        name: "title",
        createdBy: "createdByList",
        firstAirDate: "releaseDate",
      },
      camelCaseData,
    ) as Details<"tv">;

    const { createdByList } = tvResults;
    const updatedData = formatNames(createdByList, tvResults);
    return updatedData;
  } catch (error) {
    // Error will be caught by TanStack Query in fetchRoute()
    throw error;
  }
}
