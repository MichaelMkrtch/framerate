import { fetchDetails } from "@/services/fetchDetails";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const idString = searchParams.get("id");

  try {
    if (idString) {
      const id = parseInt(idString);

      const data = await fetchDetails(id);

      return NextResponse.json(data);
    } else {
      throw new Error("ID does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}
