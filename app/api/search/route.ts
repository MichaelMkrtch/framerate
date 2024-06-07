import { searchMovies } from "@/services/searchMovies";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const signal = request.signal;

  if (query) {
    const data = await searchMovies({ signal, query });

    return NextResponse.json(data);
  } else {
    redirect("/");
  }
}
