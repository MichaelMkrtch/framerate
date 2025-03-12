type ConfirmationPageProps = {
  searchParams: {
    checkoutId: string;
  };
};
export default function ConfirmationPage({
  searchParams: { checkoutId },
}: ConfirmationPageProps) {
  return <div>Thank you! Your order is now being processed.</div>;
}

// Checkout not considered successful yet. It will have a status of
// confirmed until receipt of the webhook event checkout.updated with a
// status set to succeeded.
