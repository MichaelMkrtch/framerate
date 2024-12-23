"use client";

import { useState } from "react";

import "../gradients.css";

import { CircleArrowLeft, X } from "lucide-react";
import Link from "next/link";

import AuthContent from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";
import RotatingQuotes from "@/features/auth/components/RotatingQuotes";
import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  const [page, setPage] = useState(1);

  function handleClick() {
    setPage(1);
  }

  return (
    <>
      <div
        aria-hidden={true}
        className="absolute signup-animated-mesh left-0 h-[400px] top-0 bottom-0 w-[500px] m-auto right-0"
      />
      <div
        aria-hidden={true}
        className="absolute w-full h-full bg-black/75 z-0 left-0 top-0 backdrop-blur-3xl"
      />
      <main className="relative mt-8 h-full flex flex-col justify-center items-center">
        <Link
          href="/"
          className="absolute top-0 left-2 bg-white/[0.03] p-1 rounded-full text-white"
        >
          <X size={18} />
        </Link>

        <div className="mb-24 h-12">{page === 2 && <RotatingQuotes />}</div>

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
                className="w-fit text-gray hover:text-white transition-colors duration-200 mb-2"
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
