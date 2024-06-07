import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const timeWindow = searchParams.get("timeWindow");

  if (timeWindow) {
    const data = await fetchTrendingMovies(timeWindow);

    return NextResponse.json(data);
  } else {
    redirect("/");
  }
}
