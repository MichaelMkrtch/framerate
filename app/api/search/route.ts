import { redirect } from "next/navigation";

import { searchMedia } from "@/services/searchMedia";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const signal = request.signal;

  if (query) {
    const data = await searchMedia({ signal, query });

    return Response.json(data);
  } else {
    redirect("/");
  }
}
