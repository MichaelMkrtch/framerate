import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";

import { ListItem } from "./Header";

export default function NavBar() {
  const [activePath, setActivePath] = useState<string>();
  const [linkName, setLinkName] = useState<string>("");
  const matches = useMediaQuery("(max-width: 768px)");
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
    if (!matches) {
      setActivePath(undefined);
    }
  }, [matches]);

  function handleClick() {
    setActivePath(undefined);
  }

  function handleClickOutside() {
    if (matches) {
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
        {matches && activePath === pathname ? (
          <ListItem path={pathname} classes="" handleClick={handleClick}>
            {linkName}
          </ListItem>
        ) : (
          <>
            <ListItem path="/lists" classes="" handleClick={handleClick}>
              Lists
            </ListItem>
            <ListItem path="/articles" classes="" handleClick={handleClick}>
              Articles
            </ListItem>
            <ListItem path="/library" classes="" handleClick={handleClick}>
              Library
            </ListItem>
          </>
        )}
      </ul>
    </nav>
  );
}
