import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/">
        <h1 className="text-3xl font-semibold">Lumière</h1>
      </Link>

      <nav>
        <ul className="flex items-center text-sm font-medium rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur h-10 px-3 text-zinc-800 tracking-wide">
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
            <Link href="/library" className="px-3 py-2 text-violet-600">
              Library
            </Link>
          </li>
        </ul>
      </nav>

      <button className="rounded bg-violet-500 px-4 py-2 text-white outline-none transition-colors duration-15000 ease-out active:bg-violet-600 font-medium tracking-wide">
        Add Film
      </button>
    </header>
  );
}
