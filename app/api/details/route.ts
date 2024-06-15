import { fetchDetails } from "@/services/fetchDetails";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const idString = searchParams.get("id");

  try {
    if (idString) {
      const id = parseInt(idString);

      const data = await fetchDetails(id);

      return Response.json(data);
    } else {
      throw new Error("ID does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}
