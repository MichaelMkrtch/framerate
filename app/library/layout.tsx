import Link from "next/link";
import { type ReactNode } from "react";

type LibraryLayoutProps = {
  children: ReactNode;
};

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return (
    <div className="px-3 pb-3 pt-20 md:px-0 md:pt-32">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium md:text-xl">Library</h2>
        <div>
          <Link
            href="/library?filter=film"
            className="mr-2.5 rounded bg-gray-750 bg-gradient-to-b from-zinc-200 via-zinc-200 to-zinc-200/20 bg-clip-text px-2 py-1 text-center text-transparent ring-1 ring-gray-750/70"
          >
            Film
          </Link>
          <Link
            href="/library?filter=series"
            className="mr-2.5 rounded bg-gray-750 bg-gradient-to-b from-zinc-200 via-zinc-200 to-zinc-200/20 bg-clip-text px-2 py-1 text-center text-transparent ring-1 ring-gray-750/70"
          >
            Series
          </Link>
          <Link
            href="/library"
            className="rounded bg-gray-750 bg-gradient-to-b from-zinc-200 via-zinc-200 to-zinc-200/20 bg-clip-text px-2 py-1 text-center text-transparent ring-1 ring-gray-750/70"
          >
            All
          </Link>
        </div>
      </div>
      <section className="mt-4">{children}</section>
    </div>
  );
}
