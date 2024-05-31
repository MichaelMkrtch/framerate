import { type CastMember, type CrewMember } from "@/types";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

type Credits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
  directorList: CrewMember[];
};

export async function fetchCredits(id: number) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let error = new Error("An error occured while fetching credits!");
      throw error;
    }

    const data: Credits = await response.json();

    data.directorList = data.crew.filter(
      (crewMember: CrewMember) => crewMember.job === "Director",
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
