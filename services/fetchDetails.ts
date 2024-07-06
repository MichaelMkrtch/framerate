import { type CrewMember, type Media } from "@/types";

import formatNames from "@/utils/formatNames";
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

    let formattedData = recursiveToCamel(data) as Media;

    mediaType === "movie"
      ? (formattedData.mediaType = "movie")
      : (formattedData.mediaType = "tv");

    if (formattedData.mediaType === "movie") {
      formattedData.directorList = formattedData.credits.crew.filter(
        (crewMember: CrewMember) => crewMember.job === "Director",
      );

      const { directorList } = formattedData;

      const updatedData = formatNames(directorList, formattedData);

      return updatedData;
    } else {
      const tvResults = renameKeys(
        {
          name: "title",
          firstAirDate: "releaseDate",
          createdBy: "createdByList",
        },
        formattedData,
      ) as Media<"tv">;

      const { createdByList } = tvResults;
      const updatedData = formatNames(createdByList, tvResults);
      return updatedData;
    }
  } catch (error) {
    console.log(error);
  }
}
