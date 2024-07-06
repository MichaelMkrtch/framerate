import { redirect } from "next/navigation";

import { fetchTrending } from "@/services/fetchTrending";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const timeWindow = searchParams.get("timeWindow");

  if (type && timeWindow) {
    const data = await fetchTrending(type, timeWindow);
    
    return Response.json(data);
  } else {
    redirect("/");
  }
}
