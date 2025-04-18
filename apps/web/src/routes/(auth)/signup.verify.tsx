import { createFileRoute } from "@tanstack/react-router";

import VerifyEmail from "@/features/auth/components/VerifyEmail";

export const Route = createFileRoute("/(auth)/signup/verify")({
  component: VerifyEmail,
});
