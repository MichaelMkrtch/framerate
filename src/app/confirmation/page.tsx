import Link from "next/link";

type ConfirmationPageProps = {
  searchParams: {
    checkoutId: string;
  };
};
export default function ConfirmationPage({
  searchParams: { checkoutId },
}: ConfirmationPageProps) {
  return (
    <main className="mt-10">
      <p className="mb-8">Thank you! Your order is now being processed.</p>
      <Link href="/home" className="rounded-md bg-indigo-500 px-4 py-2">
        Return To Home
      </Link>
    </main>
  );
}

// Checkout not considered successful yet. It will have a status of
// confirmed until receipt of the webhook event checkout.updated with a
// status set to succeeded.
