import { redirect } from "next/navigation";

import { api } from "@/polar";

import TiersPage from "./TiersPage";

export default async function Page() {
  const { result } = await api.products.list({ isArchived: false });

  if (result && result.items.length > 0) {
    return <TiersPage result={result} />;
  }

  // Handle error from result being undefined
  // redirect and handle message on destination page
  console.log("Something went wrong while getting plans!");
  return redirect("/home");
}
