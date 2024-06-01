const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

import { type Details } from "@/types";

export async function fetchDetails(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

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

    const data: Details = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
