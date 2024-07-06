import { redirect } from "next/navigation";

import { fetchDetails } from "@/services/fetchDetails";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mediaType = searchParams.get("type");
  const idString = searchParams.get("id");

  try {
    if (mediaType && idString) {
      const id = parseInt(idString);

      const data = await fetchDetails(mediaType, id);

      return Response.json(data);
    } else {
      throw new Error("ID does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}
