import { type User } from "lucia";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { ListItem } from "./Header";
import { AvatarIcon } from "./Icons";

import { logout } from "@/actions/auth-actions";

type NavBarProps = {
  isMobile: boolean;
  user: User | null;
};

export default function NavBar({ isMobile, user }: NavBarProps) {
  const [activePath, setActivePath] = useState<string>();
  const [linkName, setLinkName] = useState<string>("");
  const pathname = usePathname();
  const ref = useRef(null);

  useEffect(() => {
    if (pathname === "/") {
      setActivePath(pathname);
      setLinkName("Menu");
    } else if (pathname === "/lists") {
      setActivePath(pathname);
      setLinkName("Lists");
    } else if (pathname === "/articles") {
      setActivePath(pathname);
      setLinkName("Articles");
    } else if (pathname === "/library" || pathname.includes("/film/")) {
      setActivePath(pathname);
      setLinkName("Library");
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setActivePath(undefined);
    }
  }, [isMobile]);

  function handleClick() {
    setActivePath(undefined);
  }

  function handleClickOutside() {
    if (isMobile) {
      setActivePath(pathname);
    }
  }

  useOnClickOutside(ref, handleClickOutside);

  return (
    <nav>
      <ul
        ref={ref}
        className="flex h-10 items-center rounded-full bg-zinc-800/45 px-1 text-sm font-medium tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur"
      >
        {isMobile && activePath === pathname ? (
          <ListItem path={pathname} handleClick={handleClick}>
            {linkName}
          </ListItem>
        ) : (
          <>
            <ListItem path="/lists" handleClick={handleClick}>
              Lists
            </ListItem>
            <ListItem path="/articles" handleClick={handleClick}>
              Articles
            </ListItem>
            <ListItem path="/library" handleClick={handleClick}>
              Library
            </ListItem>
            {user ? (
              <div className="px-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <AvatarIcon fill="#52525b" classes="h-9 w-7" />
                  </AvatarFallback>
                </Avatar>
                {/* <form action={logout}>
                  <button>Logout</button>
                </form> */}
              </div>
            ) : null}
          </>
        )}
      </ul>
    </nav>
  );
}
