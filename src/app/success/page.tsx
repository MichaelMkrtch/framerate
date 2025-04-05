import Link from "next/link";

import { Polar } from "@polar-sh/sdk";

type Params = Promise<{ slug: string }>;

type SearchParams = Promise<{
  checkoutId: string;
  customer_session_token: string;
}>;

export default async function SuccessPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { checkoutId } = await props.searchParams;

  const polar = new Polar({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN,
  });

  async function getData() {
    const checkoutResult = await polar.checkouts.get({
      id: checkoutId,
    });

    if (checkoutResult?.status === "succeeded") {
      console.log("succeeded");

      // redirect("/home");
    } else {
      console.log("failed");

      // redirect("/preferences");
    }
  }

  getData();
  return (
    <main className="mt-10">
      <p className="mb-8">
        Thank you! Please wait while we activate your subscription.
      </p>
      <Link href="/home" className="rounded-md bg-indigo-500 px-4 py-2">
        Return To Home
      </Link>
    </main>
  );
}
