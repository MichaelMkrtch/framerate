import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import AuthContent from "@web/features/auth/components/AuthContent";
import AuthFooter from "@web/features/auth/components/AuthFooter";
import RotatingQuotes from "@web/features/auth/components/RotatingQuotes";
import SignupForm from "@web/features/auth/components/SignupForm";

import { CircleArrowLeft, X } from "lucide-react";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [page, setPage] = useState(1);

  function handleClick() {
    setPage(1);
  }

  return (
    <>
      <div
        aria-hidden={true}
        className="signup-animated-mesh absolute top-0 right-0 bottom-0 left-0 m-auto h-[400px] w-[500px]"
      />
      <div
        aria-hidden={true}
        className="absolute top-0 left-0 z-0 size-full bg-black/75 backdrop-blur-3xl"
      />
      <main className="relative flex h-full flex-col items-center justify-center">
        <Link
          to="/"
          className="text-foreground absolute top-8 left-2 rounded-full bg-white/[0.03] p-1 transition-colors duration-200 hover:bg-white/5"
        >
          <X size={18} />
        </Link>

        <div className={`mb-24 h-12 ${page === 2 ? "block" : "hidden"}`}>
          <RotatingQuotes />
        </div>

        <div className="animate-fade-in">
          <div className="relative bottom-[70px]">
            {page === 1 && (
              <AuthContent
                title="Welcome to FrameRate"
                description="Thank you for being an early adopter. Let's set up your account."
              />
            )}

            <section>
              {page === 2 && (
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-gray hover:text-foreground mb-4 w-fit transition-colors duration-200"
                >
                  <CircleArrowLeft size={32} strokeWidth={1.1} />
                </button>
              )}
              <SignupForm page={page} setPage={setPage} />
            </section>
          </div>
        </div>
      </main>

      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        linkTo="/login"
      />
    </>
  );
}
