"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEventHandler, type ReactNode } from "react";

import SearchModal from "../search/SearchModal";
import NavBar from "./NavBar";

type ListItemProps = {
  path: string;
  handleClick: MouseEventHandler;
  classes: string;
  children: ReactNode;
};

export function ListItem({
  path,
  handleClick,
  classes,
  children,
}: ListItemProps) {
  const pathname = usePathname();

  return (
    <li className="duration-75 ease-in-out md:active:scale-95">
      <Link
        href={path}
        onClick={handleClick}
        className={`${classes} px-2 py-1.5 transition-colors duration-75 ease-in md:px-3 md:py-2 ${pathname === path && path !== "/" && !path.includes("/film/") ? "text-cyan-350" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <header className="fixed m-auto flex w-full items-center justify-between px-3 py-3 md:max-w-2xl md:justify-between md:px-0 md:py-5 md-tablet:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <Link href="/">
        <h1 className="font-noto text-lg font-medium md:block md:text-3xl md:font-bold">
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
