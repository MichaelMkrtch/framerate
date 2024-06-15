import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const timeWindow = searchParams.get("timeWindow");

  if (timeWindow) {
    const data = await fetchTrendingMovies(timeWindow);

    return Response.json(data);
  } else {
    redirect("/");
  }
}
