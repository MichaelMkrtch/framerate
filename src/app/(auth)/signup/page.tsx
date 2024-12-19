import { CircleArrowRight, X } from "lucide-react";
import Link from "next/link";

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

        <section className="relative bottom-10 flex flex-col items-center">
          <h1 className="text-[28px] font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9370db] to-[#f4b541]">
            Welcome to FrameRate
          </h1>
          <p className="mb-6 w-72 text-center text-sm tracking-wide text-gray font-medium">
            Thank you for being an early adopter. Let&#39;s set up your account.
          </p>
          <div className="relative bg-white/[0.01] flex items-center ring-1 ring-white/10 rounded-full">
            <input
              type="email"
              placeholder="account email"
              autoFocus
              className="text-sm font-medium rounded-full pl-6 pr-3 py-3 w-80 bg-transparent outline-none placeholder:text-white/25 placeholder:font-medium"
            />
            <div className="pr-2.5 text-gray">
              <CircleArrowRight size={32} strokeWidth={1.1} />
            </div>
          </div>
        </section>
      </main>

      <footer className="absolute bottom-6 text-gray font-medium text-sm text-center left-0 right-0">
        <div className="gradient-highlight w-full h-[1px]"></div>
        <p className="mt-6">
          Already have an account?
          <Link href="/login" className="text-white">
            {" "}
            Login
          </Link>
          .
        </p>
      </footer>
    </>
  );
}
