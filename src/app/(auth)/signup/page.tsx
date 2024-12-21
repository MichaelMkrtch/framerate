"use client";

import { useState } from "react";

import { CircleArrowLeft, X } from "lucide-react";
import Link from "next/link";

import AuthContent from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";
import SignupForm from "@/features/auth/components/SignupForm";

export default function Signup() {
  const [page, setPage] = useState(1);

  function handleClick() {
    setPage(1);
  }

  return (
    <>
      <main className="relative bottom-[70px] mt-8 h-full flex flex-col justify-center items-center">
        <Link
          href="/"
          className="absolute top-0 left-0 bg-white/[0.03] p-1 rounded-full text-white"
        >
          <X size={18} />
        </Link>

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
      </main>

      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        linkTo="/login"
      />
    </>
  );
}
