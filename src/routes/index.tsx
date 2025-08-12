import { createFileRoute, Link } from '@tanstack/react-router';
import { Fingerprint, Ticket } from 'lucide-react';

import { GlassElement } from '@/components/liquid-glass/glass-element';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
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
              className="group/signup peer flex items-center gap-2 rounded-full border border-transparent bg-clip-border bg-origin-padding px-3.5 py-0.5"
            >
              <span className="text-gray group-hover/signup:text-foreground transition-colors duration-200">
                <Ticket size={18} />
              </span>
              Create free account
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto">
        {/* Image */}
        <section className="relative mx-auto w-full">
          <div className="relative top-24 right-0 left-0 mx-auto w-[95%]">
            <img
              src="https://image.tmdb.org/t/p/original/5syRZHBCzzCwkluq7EMrE8vYdlE.jpg"
              alt="Julia Garner in Weapons (2025)."
              width={1920}
              height={1080}
              decoding="async"
              loading="eager"
              className="animate-fade-in aspect-[143/100] rounded-3xl rounded-br-none rounded-bl-none object-cover"
            />
            <div className="easing-gradient absolute top-0 right-0 left-0 size-full"></div>
            <span className="text-foreground/70 absolute top-1/2 -right-8 z-10 -rotate-90 text-sm font-medium text-nowrap">
              Weapons (2025)
            </span>
          </div>

          {/* Hero Text */}
          <section className="absolute top-4/5 right-0 left-0 z-50 mx-auto mb-10 w-fit text-center">
            <div className="mb-6">
              <h2 className="text-4xl font-bold tracking-tight">
                From premieres to finales.
              </h2>
              <p className="mt-2 text-[18px] font-semibold tracking-wide">
                Every movie. Every show. Every moment.
              </p>
            </div>

            {/* CTA */}
            <Link to="/signup" className="inline-block">
              <GlassElement
                width={275}
                height={38}
                radius={50}
                depth={10}
                blur={2}
                chromaticAberration={5}
                debug={false}
              >
                <span className="text-foreground font-bold tracking-wide">
                  Start Tracking
                </span>
              </GlassElement>
            </Link>
          </section>
        </section>
      </main>
    </div>
  );
}
