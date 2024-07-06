import { type CrewMember, type Media } from "@/types";

import { renameKeys } from "@/utils/renameKeys";
import recursiveToCamel from "@/utils/snakeCaseToCamelCase";

const API_TOKEN = process.env.API_TOKEN as string;

export async function fetchDetails(mediaType: string, id: number) {
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
      let error = new Error("An error occurred while fetching details!");
      throw error;
    }

    const data: Media = await response.json();

    mediaType === "movie"
      ? (data.mediaType = "movie")
      : (data.mediaType = "tv");

    if (data.mediaType === "movie") {
      // format Director information
      data.directorList = data.credits.crew.filter(
        (crewMember: CrewMember) => crewMember.job === "Director",
      );

      const { directorList } = data;

      if (directorList.length > 2) {
        data.director =
          directorList
            .map((director) => director.name)
            .slice(0, 2)
            .join(", ") + "...";
      } else if (directorList.length === 2) {
        data.director = directorList
          .map((director) => director.name)
          .join(", ");
      } else if (directorList.length === 1) {
        data.director = directorList[0].name;
      } else {
        data.director = "Unknown";
      }
    }

    const formattedData = recursiveToCamel(data) as Media;

    if (mediaType === "tv") {
      data.mediaType = "tv";

      const tvResults = renameKeys(
        { name: "title", firstAirDate: "releaseDate" },
        formattedData,
      ) as Media<"tv">;
      return tvResults;
    }

    return formattedData;
  } catch (error) {
    console.log(error);
  }
}
