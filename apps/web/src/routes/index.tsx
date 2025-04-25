import { createFileRoute, Link } from "@tanstack/react-router";

import theaterImg from "@web/assets/images/theater.png";

import { Fingerprint, Ticket } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative h-full">
      <header>
        <nav className="flex items-center justify-between pt-8">
          <Link to="/">
            <h1 className="text-3xl font-extrabold">FrameRate</h1>
          </Link>

          <div className="flex items-center gap-10 font-semibold">
            <Link to="/login" className="group/login flex items-center gap-2">
              <span className="text-gray group-hover/login:text-foreground transition-colors duration-200">
                <Fingerprint size={18} />
              </span>
              Login
            </Link>

            <Link
              to="/signup"
              className="pill-bg group/signup peer flex items-center gap-2 rounded-full border border-transparent px-3.5 py-0.5"
            >
              <span className="text-gray group-hover/signup:text-foreground transition-colors duration-200">
                <Ticket size={18} />
              </span>
              Create free account
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto px-20">
        {/* Images */}
        <section className="absolute top-0 right-0 left-0 -z-10 mx-auto w-full items-center">
          <img
            src={theaterImg}
            alt="A dark movie theater."
            width={1920}
            height={1080}
            decoding="async"
            loading="eager"
            className="animate-fade-in relative"
          />

          <div className="absolute top-24 right-0 left-0 mx-auto w-[90%]">
            <img
              src="https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
              alt="Joel and Ellie from the TV series The Last of Us, released in 2023."
              width={1920}
              height={1080}
              decoding="async"
              loading="eager"
              className="animate-fade-in"
            />
            <div className="backdrop-fade absolute top-0 right-0 left-0 z-10 size-full"></div>
            <div className="easing-gradient absolute top-0 right-0 left-0 size-full"></div>
            <span className="text-gray/40 absolute top-1/2 -right-4 z-10 -rotate-90 text-sm font-medium text-nowrap">
              The Last of Us (2023)
            </span>
          </div>
          <div className="side-bottom-fade absolute top-0 right-0 left-0 z-10 size-full"></div>
        </section>

        {/* Hero Text */}
        <section className="mb-10 pt-[475px] text-center">
          <div className="mb-8">
            <h2 className="text-[32px] font-bold tracking-tight">
              Movie madness, managed.
            </h2>
            <p className="mt-3 text-[18px] font-medium tracking-wide">
              Track your cinematic journey.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/signup"
            className="hover:bg-foreground text-foreground relative rounded-full border border-white/70 px-12 py-1.5 font-bold tracking-wide shadow-sm transition-all duration-200 ease-in hover:text-neutral-800"
          >
            Get started
          </Link>
        </section>
      </main>
    </div>
  );
}
