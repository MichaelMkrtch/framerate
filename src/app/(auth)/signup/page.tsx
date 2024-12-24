"use client";

import { useState } from "react";
import Link from "next/link";

import { CircleArrowLeft, X } from "lucide-react";

import AuthContent from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";
import RotatingQuotes from "@/features/auth/components/RotatingQuotes";
import SignupForm from "@/features/auth/components/SignupForm";

import "../gradients.css";

export default function SignupPage() {
  const [page, setPage] = useState(1);

  function handleClick() {
    setPage(1);
  }

  return (
    <>
      <div
        aria-hidden={true}
        className="signup-animated-mesh absolute bottom-0 left-0 right-0 top-0 m-auto h-[400px] w-[500px]"
      />
      <div
        aria-hidden={true}
        className="absolute left-0 top-0 z-0 h-full w-full bg-black/75 backdrop-blur-3xl"
      />
      <main className="relative mt-8 flex h-full flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute left-2 top-0 rounded-full bg-white/[0.03] p-1 text-white transition-colors duration-200 hover:bg-white/5"
        >
          <X size={18} />
        </Link>

        <div className={`mb-24 h-12 ${page === 2 ? "block" : "hidden"}`}>
          <RotatingQuotes />
        </div>

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
                className="mb-2 w-fit text-gray transition-colors duration-200 hover:text-white"
              >
                <CircleArrowLeft size={32} strokeWidth={1.1} />
              </button>
            )}
            <SignupForm page={page} setPage={setPage} />
          </section>
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
