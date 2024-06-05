import { type CrewMember, type Film } from "@/types";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

export async function fetchDetails(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`;

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

    const data: Film = await response.json();

    data.directorList = data.credits.crew.filter(
      (crewMember: CrewMember) => crewMember.job === "Director",
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
