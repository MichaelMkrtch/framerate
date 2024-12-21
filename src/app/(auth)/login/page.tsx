import { X } from "lucide-react";
import Link from "next/link";

import AuthForm from "@/features/auth/components/AuthContent";
import AuthFooter from "@/features/auth/components/AuthFooter";

export default function LoginPage() {
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
          title="Login to FrameRate"
          description="If you have access to FrameRate, you can enter your email below."
        />
      </main>

      <AuthFooter
        text="Don't have an account yet?"
        linkText="Sign up"
        linkTo="/signup"
      />
    </>
  );
}
