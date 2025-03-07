import Image from "next/image";
import Link from "next/link";

import { Fingerprint, Ticket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative">
      <header>
        <nav className="flex items-center justify-between pt-8">
          <Link href="/">
            <h1 className="text-3xl font-extrabold">FrameRate</h1>
          </Link>

          <div className="flex items-center gap-10 font-semibold">
            <Link href="/login" className="group/login flex items-center gap-2">
              <span className="text-gray transition-colors duration-200 group-hover/login:text-white">
                <Fingerprint size={18} />
              </span>
              Login
            </Link>

            <Link
              href="/signup"
              className="highlight-bg group/trial peer flex items-center gap-2 rounded-full border border-transparent px-3.5 py-0.5"
            >
              <span className="text-gray transition-colors duration-200 group-hover/trial:text-white">
                <Ticket size={18} />
              </span>
              Create free account
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto size-full px-20">
        <div className="absolute left-0 right-0 top-0 -z-10 mx-auto w-full items-center">
          <Image
            src="https://image.tmdb.org/t/p/original/ote8qQ1fmzM74Q1sJ1YgRh6UZFd.jpg"
            alt="A still image from the film Nosferatu (2024)"
            width={1920}
            height={1080}
            priority
          />
          <div className="backdrop-fade absolute left-0 top-0 h-full w-full" />
          <span className="absolute right-0 top-1/2 -rotate-90 text-nowrap text-sm text-white/30">
            Mickey 17 (2025)
          </span>
        </div>

        <section className="mb-12 pt-[450px] text-center">
          <div className="mb-8">
            <h2 className="text-[32px] font-bold tracking-tight">
              Movie madness, managed.
            </h2>
            <p className="mt-3 text-[18px] font-medium tracking-wide">
              Track your cinematic journey.
            </p>
          </div>

          <Link
            href="/signup"
            className="relative rounded-full border border-white/70 px-12 py-1.5 font-bold tracking-wide text-white shadow-sm transition-all duration-200 ease-in hover:bg-foreground hover:text-neutral-800"
          >
            Get started
          </Link>
        </section>

        <p className="text-center font-semibold text-gray">
          From blockbusters to hidden gems, we&#39;ve got you covered.
        </p>
      </main>
    </div>
  );
}
