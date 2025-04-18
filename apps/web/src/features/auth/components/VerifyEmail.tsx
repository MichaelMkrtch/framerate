import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "@tanstack/react-router";
import { useClerk } from "@clerk/tanstack-react-start";
import {
  EmailLinkErrorCodeStatus,
  isEmailLinkError,
} from "@clerk/tanstack-react-start/errors";

import { toast } from "sonner";

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState("loading");

  const { handleEmailLinkVerification, loaded } = useClerk();

  async function verify() {
    try {
      // Dynamically set the host domain for dev and prod
      const protocol = window.location.protocol;
      const host = window.location.host;

      await handleEmailLinkVerification({});

      setVerificationStatus("verified");
    } catch (err: any) {
      let status = "failed";

      if (isEmailLinkError(err)) {
        if (err.code === EmailLinkErrorCodeStatus.Expired) {
          status = "expired";
        }
      }

      setVerificationStatus(status);
      console.error("Something went wrong while verifying email!", err);
    }
  }

  useEffect(() => {
    if (!loaded) return;

    verify();
  }, [handleEmailLinkVerification, loaded]);

  if (verificationStatus === "failed") {
    toast.error("Verification failed!");
    return (
      <PageTemplate
        content="Verification failed. Please try again."
        redirect
        redirectTo="/signup"
        redirectText="Sign Up"
      />
    );
  }

  if (verificationStatus === "expired") {
    toast.error("The email link has expired. Please try again.");
    return (
      <PageTemplate
        content="Verification link expired. Please try again."
        redirect
        redirectTo="/signup"
        redirectText="Sign Up"
      />
    );
  }

  if (verificationStatus === "verified") {
    toast.success("Account created!");

    return <Navigate to="/home" replace />;
  }
}

function PageTemplate({
  content,
  redirect,
  redirectText,
  redirectTo,
}: {
  content: string;
  redirect?: boolean;
  redirectText?: string;
  redirectTo?: string;
}) {
  return (
    <main className="h-full">
      <h1 className="pt-8 text-3xl font-extrabold">FrameRate</h1>

      <div className="flex h-5/6 flex-col items-center justify-center">
        <p className="animate-fade-in text-xl font-medium">{content}</p>

        {redirect && (
          <Link
            to={redirectTo}
            className="text-gray hover:text-foreground mt-4 transition-colors duration-200"
          >
            {redirectText}
          </Link>
        )}
      </div>
    </main>
  );
}
