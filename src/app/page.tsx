import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      <nav className="flex justify-between items-center pt-8">
        <Link href="/">
          <h1 className="text-3xl font-extrabold">FrameRate</h1>
        </Link>
        <div className="flex items-center gap-10 font-semibold">
          <Link href="/" className="flex items-center gap-2 group/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray transition-colors duration-200 group-hover/login:text-white"
            >
              <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
              <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
              <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
              <path d="M2 12a10 10 0 0 1 18-6" />
              <path d="M2 16h.01" />
              <path d="M21.8 16c.2-2 .131-5.354 0-6" />
              <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
              <path d="M8.65 22c.21-.66.45-1.32.57-2" />
              <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
            </svg>
            Login
          </Link>
          <Link
            href="/"
            className="px-3.5 py-0.5 border border-white/35 rounded-full peer"
          >
            Start your trial
          </Link>
        </div>
      </nav>
      <main className="mx-auto h-full w-full px-20">
        <div className="-z-10 absolute top-0 left-0 right-0 flex w-full items-center">
          <Image
            src="https://image.tmdb.org/t/p/original/2gAStVyyv9C3BSEKhP0a1aM3Qy9.jpg"
            alt="A still image from the film Nosferatu (2024)"
            width={1920}
            height={1080}
            priority
            className="relative"
          />
          <div className="backdrop-fade absolute top-0 left-0 w-full h-full" />
          <span className="relative right-20 text-nowrap text-sm -rotate-90 text-white/30">
            Nosferatu (2024)
          </span>
        </div>

        <section className="mt-[450px] text-center mb-12">
          <div className="mb-8">
            <h2 className="text-[32px] font-bold tracking-tight">
              Movie madness, managed.
            </h2>
            <p className="font-medium tracking-wide text-[18px] mt-4">
              Track your cinematic journey.
            </p>
          </div>

          <button className="shadow-sm relative rounded-full border border-white tracking-wide text-white hover:bg-foreground hover:text-neutral-800 font-bold px-12 py-1.5 transition-all duration-200 ease-in">
            Get started
          </button>
        </section>

        <p className="text-gray text-center font-semibold">
          From blockbusters to hidden gems, we&#39;ve got you covered.
        </p>
      </main>
    </div>
  );
}
