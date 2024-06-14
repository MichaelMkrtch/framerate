"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";

import SearchModal from "../search/SearchModal";
import { MagnifyingGlassIcon } from "./Icons";
import NavBar from "./NavBar";

type ListItemProps = {
  path: string;
  handleClick: MouseEventHandler;
  children: ReactNode;
};

export function ListItem({ path, handleClick, children }: ListItemProps) {
  const pathname = usePathname();

  return (
    <li className="duration-75 ease-in-out md:active:scale-95">
      <Link
        href={path}
        onClick={handleClick}
        className={`px-2 py-1.5 transition-colors duration-75 ease-in md:px-3 md:py-2 ${pathname === path && path !== "/" && !path.includes("/film/") ? "text-cyan-350" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="fixed m-auto flex w-full items-center justify-between px-3 py-3 md:max-w-2xl md:justify-between md:px-0 md:py-5 md-tablet:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <Link href="/">
        <h1 className="font-noto text-lg font-medium md:block md:text-3xl md:font-bold">
          Lumière
        </h1>
      </Link>

      <NavBar isMobile={isMobile} />

      <SearchModal>
        {isClient && isMobile ? (
          <button className="fixed bottom-0 right-0 mb-10 mr-5 flex items-center rounded-full bg-zinc-800/45 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur md:hidden">
            <MagnifyingGlassIcon classes="my-auto h-5 w-5" />
          </button>
        ) : (
          <button className="hidden rounded bg-cyan-350 px-4 py-2 font-medium tracking-wide text-gray-850 outline-none ring-1 ring-cyan-450 transition-colors duration-200 ease-out active:bg-cyan-550 md:block">
            Search
          </button>
        )}
      </SearchModal>
    </header>
  );
}
