import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { ListItem } from "./Header";

type NavBarProps = {
  isMobile: boolean;
};

export default function NavBar({ isMobile }: NavBarProps) {
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
        className="flex h-10 items-center rounded-full bg-zinc-800/45 px-1 text-sm font-medium tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur md:px-3"
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
          </>
        )}
      </ul>
    </nav>
  );
}
