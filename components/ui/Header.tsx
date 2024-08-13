"use client";

import { type User } from "lucia";
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

import { validateRequest } from "@/lib/auth";
import { getUserById } from "@/lib/user";
import { useUserStore } from "@/store/userStore";

type ListItemProps = {
  path: string;
  handleClick: MouseEventHandler;
  children: ReactNode;
};

export function ListItem({ path, handleClick, children }: ListItemProps) {
  const pathname = usePathname();
  const pathsToHighlight = ["/lists", "/articles", "/library"];

  return (
    <li className="duration-75 ease-in-out md:active:scale-95">
      <Link
        href={path}
        onClick={handleClick}
        className={`px-2 py-1.5 transition-colors duration-75 ease-in md:px-3 md:py-2 ${pathname === path && path !== "/" && pathsToHighlight.includes(path) ? "text-cyan-350" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const { setUsername, clearUsername } = useUserStore((state) => ({
    setUsername: state.setUsername,
    clearUsername: state.clearUsername,
  }));

  useEffect(() => {
    setIsClient(true);

    (async () => {
      const result = await validateRequest();

      if (result.user) {
        const userResult = await getUserById(result.user.id);
        userResult && setUsername(userResult.username);
      }
    })();

    return () => clearUsername();
  }, [user, setUsername, clearUsername]);

  return (
    <>
      <div
        className={`${isMobile && isOpen ? "block" : "hidden"} absolute z-10 h-screen w-full`}
      />
      <header
        className={`${(pathname.includes("/film") || pathname.includes("/series")) && "md:!bg-transparent md:before:backdrop-blur-none"} fixed top-0 z-50 m-auto flex w-full items-center justify-between bg-gray-950/70 px-3 py-1.5 before:fixed before:left-0 before:right-0 before:top-0 before:-z-10 before:h-[52px] before:w-full before:backdrop-blur-xl md:w-[93.8%] md:max-w-2xl md:justify-between md:bg-gray-950/90 md:px-0 md:py-5 md:before:h-20 md-tablet:max-w-3xl lg:max-w-5xl xl:max-w-6xl`}
      >
        <Link href="/">
          <h1 className="font-noto text-lg font-medium md:block md:text-3xl md:font-bold">
            Lumière
          </h1>
        </Link>

        <NavBar
          isMobile={isMobile}
          user={user}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <SearchModal>
          {isClient && isMobile ? (
            <button className="fixed bottom-0 right-0 z-50 mb-8 mr-5 flex items-center rounded-full bg-zinc-800/45 p-4 shadow-lg outline-none ring-1 ring-white/10 backdrop-blur-lg md:hidden">
              <MagnifyingGlassIcon classes="my-auto h-5 w-5" />
            </button>
          ) : (
            <button className="mr-0.5 hidden rounded bg-cyan-350 px-4 py-2 font-medium tracking-wide text-gray-850 outline-none ring-1 ring-cyan-300 transition-colors duration-200 ease-out active:bg-cyan-550 md:block">
              Search
            </button>
          )}
        </SearchModal>
      </header>
    </>
  );
}
