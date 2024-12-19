import { X } from "lucide-react";
import Link from "next/link";

import AuthFooter from "@/components/AuthFooter";
import AuthForm from "@/components/AuthForm";

export default function Signup() {
  return (
    <>
      <main className="relative mt-8 h-full flex justify-center items-center">
        <Link
          href="/"
          className="absolute top-0 left-0 bg-white/[0.03] p-1 rounded-full text-white"
        >
          <X size={18} />
        </Link>

        <AuthForm
          title="Welcome to FrameRate"
          description="Thank you for being an early adopter. Let's set up your account."
        />
      </main>

      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        linkTo="/login"
      />
    </>
  );
}
