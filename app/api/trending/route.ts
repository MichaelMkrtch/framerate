import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await fetchTrendingMovies();

  return NextResponse.json(data);
}
