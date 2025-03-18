import { redirect } from "next/navigation";

import { CustomerPortal } from "@polar-sh/nextjs";
import { Polar } from "@polar-sh/sdk";

import { verifyUser } from "@/lib/verifyUser";

const polar = new Polar({
  server: "sandbox",
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

export const GET = CustomerPortal({
  server: "sandbox",
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: getCustomer,
});

async function getCustomer() {
  const sessionToken = await createCustomerSession();

  const customer = await polar.customerPortal.customers.get({
    customerSession: sessionToken,
  });

  return customer.id;
}

async function createCustomerSession() {
  const user = await verifyUser();

  if (!user) {
    redirect("/login");
  }

  const result = await polar.customerSessions.create({
    customerExternalId: user.id,
  });

  return result.token;
}
