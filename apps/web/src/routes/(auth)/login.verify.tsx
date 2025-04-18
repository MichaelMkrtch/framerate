import { createFileRoute } from "@tanstack/react-router";

import VerifyEmail from "@/features/auth/components/VerifyEmail";

export const Route = createFileRoute("/(auth)/login/verify")({
  component: VerifyLogin,
});

function VerifyLogin() {
  return <VerifyEmail mode="login" />;
}
