"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import SearchModal from "../search/SearchModal";

type ListItemProps = { path: string; classes?: string; children: ReactNode };

function ListItem({ path, classes, children }: ListItemProps) {
  const pathname = usePathname();

  return (
    <li className="duration-75 ease-in-out active:scale-95">
      <Link
        href={`${path}`}
        className={`${classes} px-3 py-2 transition-colors duration-75 ease-in ${pathname === path ? "text-cyan-350" : null}`}
      >
        {children}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <nav>
      <ul className="flex h-10 items-center rounded-full bg-zinc-800/45 px-1 text-sm font-medium tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur md:px-3">
        <ListItem classes="hidden" path="/films">
          Films
        </ListItem>
        <ListItem classes="hidden" path="/lists">
          Lists
        </ListItem>
        <ListItem classes="hidden" path="/articles">
          Articles
        </ListItem>
        <ListItem path="/library">Library</ListItem>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="md-tablet:max-w-3xl fixed m-auto flex w-full items-center justify-end px-3 py-3 md:max-w-2xl md:justify-between md:px-0 md:py-5 lg:max-w-4xl xl:max-w-6xl">
      <Link href="/">
        <h1 className="hidden font-noto text-3xl font-bold md:block">
          Lumière
        </h1>
      </Link>

      <NavBar />

      <SearchModal>
        <button className="hidden rounded bg-cyan-350 px-4 py-2 font-medium tracking-wide text-gray-850 outline-none ring-1 ring-cyan-450 transition-colors duration-200 ease-out active:bg-cyan-550 md:block">
          Search
        </button>
      </SearchModal>
    </header>
  );
}
