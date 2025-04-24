import { createFileRoute, Link } from "@tanstack/react-router";

import AuthContent from "@web/features/auth/components/AuthContent";
import AuthFooter from "@web/features/auth/components/AuthFooter";
import { X } from "lucide-react";

import "@web/styles/gradients.css";

import LoginForm from "@web/features/auth/components/LoginForm";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <div
        aria-hidden={true}
        className="login-animated-mesh absolute top-24 right-0 bottom-0 left-0 m-auto h-[400px] w-[500px]"
      />
      <div
        aria-hidden={true}
        className="absolute top-0 left-0 z-0 size-full bg-black/70 backdrop-blur-3xl"
      />

      <main className="relative flex h-full items-center justify-center">
        <Link
          to="/"
          className="absolute top-8 left-2 rounded-full bg-white/[0.03] p-1 text-white transition-colors duration-200 hover:bg-white/5"
        >
          <X size={18} />
        </Link>

        <div className="animate-fade-in relative bottom-[70px]">
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
