import { redirect } from "next/navigation";

import { api } from "@/polar";

import TiersPage from "./TiersPage";

export default async function Page() {
  const { result } = await api.products.list({ isArchived: false });

  return <TiersPage result={result} />;
}
