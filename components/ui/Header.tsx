import Link from "next/link";
import SearchModal from "../search/SearchModal";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/">
        <h1 className="text-3xl font-semibold text-zinc-200">Lumière</h1>
      </Link>

      <nav>
        <ul className="flex h-10 items-center rounded-full bg-zinc-800/95 px-3 text-sm font-medium tracking-wide text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur">
          <li>
            <Link href="/films" className="px-3 py-2">
              Films
            </Link>
          </li>
          <li>
            <Link href="/lists" className="px-3 py-2">
              Lists
            </Link>
          </li>
          <li>
            <Link href="/articles" className="px-3 py-2">
              Articles
            </Link>
          </li>
          <li>
            <Link href="/library" className="px-3 py-2 text-[#00e4f5]">
              Library
            </Link>
          </li>
        </ul>
      </nav>

      <SearchModal>
        <button className="rounded bg-[#00e4f5] px-4 py-2 font-medium tracking-wide text-zinc-900/90 outline-none ring-1 ring-[#00d1e0] transition-colors duration-200 ease-out active:bg-[#00becc]">
          Search
        </button>
      </SearchModal>
    </header>
  );
}
