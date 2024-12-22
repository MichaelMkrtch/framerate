"use client";

import { X } from "lucide-react";
import Link from "next/link";

import AuthContent from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";

import "../gradients.css";

import { useState } from "react";

export default function LoginPage() {
  const [emailEntered, setEmailEntered] = useState(false);

  return (
    <>
      <div
        aria-hidden={true}
        className="absolute login-animated-mesh left-0 h-[400px] top-24 bottom-0 w-[500px] m-auto right-0"
      />
      <div
        aria-hidden={true}
        className="absolute w-full h-full bg-black/70 z-0 left-0 top-0 backdrop-blur-3xl"
      />

      <main className="relative mt-8 h-full flex justify-center items-center">
        <Link
          href="/"
          className="absolute top-0 left-0 bg-white/[0.03] p-1 rounded-full text-white"
        >
          <X size={18} />
        </Link>

        <div className="relative bottom-[70px]">
          <AuthContent
            title="Login to FrameRate"
            description="If you have access to FrameRate, you can enter your email below."
          />

          <section>{/* Login Form */}</section>
        </div>
      </main>

      <AuthFooter
        text="Don't have an account yet?"
        linkText="Sign up"
        linkTo="/signup"
      />
    </>
  );
}
