"use client";

import Link from "next/link";

import { X } from "lucide-react";

import AuthContent from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";

import "../gradients.css";

import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div
        aria-hidden={true}
        className="login-animated-mesh absolute bottom-0 left-0 right-0 top-24 m-auto h-[400px] w-[500px]"
      />
      <div
        aria-hidden={true}
        className="absolute left-0 top-0 z-0 size-full bg-black/70 backdrop-blur-3xl"
      />

      <main className="relative mt-8 flex h-full items-center justify-center">
        <Link
          href="/"
          className="absolute left-2 top-0 rounded-full bg-white/[0.03] p-1 text-white transition-colors duration-200 hover:bg-white/5"
        >
          <X size={18} />
        </Link>

        <div className="relative bottom-[70px]">
          <AuthContent
            title="Login to FrameRate"
            description="If you have access to FrameRate, you can enter your email below."
          />

          <section>
            <LoginForm />
          </section>
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
