import { type MouseEvent, useRef, useState } from "react";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";

import { ListItem } from "./Header";

export default function NavBar() {
  const [activeLink, setActiveLink] = useState<string>();
  const [classes, setClasses] = useState<string>("");
  const [targetPath, setTargetPath] = useState<string>("/");
  const ref = useRef(null);
  const matches = useMediaQuery("(max-width: 768px)");

  function handleClick(event: MouseEvent) {
    if (matches) {
      setActiveLink("/");
      setClasses("hidden");

      if (activeLink) {
        setActiveLink(undefined);
        setClasses("");
        return;
      }

      const target = event.currentTarget as HTMLAnchorElement;

      setTargetPath(target.pathname);
      setActiveLink(target.pathname);
      setClasses("hidden");
    } else {
      setActiveLink(undefined);
      setClasses("");
    }
  }

  function handleClickOutside() {
    if (matches && !classes.includes("hidden")) {
      setActiveLink(targetPath);
      setClasses("hidden");
    }
  }

  useOnClickOutside(ref, handleClickOutside);

  return (
    <nav>
      <ul
        ref={ref}
        className="flex h-10 items-center rounded-full bg-zinc-800/45 px-1 text-sm font-medium tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur md:px-3"
      >
        <ListItem
          path="/"
          activeLink={activeLink}
          handleClick={handleClick}
          classes={" block md:hidden " + classes}
        >
          Lumière
        </ListItem>
        <ListItem
          path="/films"
          activeLink={activeLink}
          handleClick={handleClick}
          classes={classes}
        >
          Films
        </ListItem>
        <ListItem
          path="/lists"
          activeLink={activeLink}
          handleClick={handleClick}
          classes={classes}
        >
          Lists
        </ListItem>
        <ListItem
          path="/articles"
          activeLink={activeLink}
          handleClick={handleClick}
          classes={classes}
        >
          Articles
        </ListItem>
        <ListItem
          path="/library"
          activeLink={activeLink}
          handleClick={handleClick}
          classes={classes}
        >
          Library
        </ListItem>
      </ul>
    </nav>
  );
}
