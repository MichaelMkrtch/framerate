import { redirect } from "next/navigation";

import { api } from "@/polar";

import { verifyUser } from "@/lib/verifyUser";
import TiersPage from "./TiersPage";

export default async function Page() {
  const { result } = await api.products.list({ isArchived: false });

  const user = await verifyUser();

  console.log("tiers page", user);

  if (!user) {
    redirect("/login");
  }

  return <TiersPage result={result} userId={user.id} />;
}
