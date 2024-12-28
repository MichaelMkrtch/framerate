import Image from "next/image";
import Link from "next/link";

export default function Root() {
  return (
    <main className="mx-auto size-full px-20">
      <div className="absolute left-0 right-0 top-0 -z-10 flex w-full items-center">
        <Image
          src="https://image.tmdb.org/t/p/original/2gAStVyyv9C3BSEKhP0a1aM3Qy9.jpg"
          alt="A still image from the film Nosferatu (2024)"
          width={1920}
          height={1080}
          priority
          className="relative"
        />
        <div className="backdrop-fade absolute left-0 top-0 h-full w-full" />
        <span className="relative right-20 -rotate-90 text-nowrap text-sm text-white/30">
          Nosferatu (2024)
        </span>
      </div>

      <section className="mb-12 mt-[450px] text-center">
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
  );
}
