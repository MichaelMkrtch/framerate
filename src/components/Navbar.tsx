"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import {
  Bolt,
  CircleUserIcon,
  Compass,
  Search,
  SquareLibrary,
} from "lucide-react";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";

import HomeIcon from "@/components/icons/HomeIcon";
import Tooltip from "@/components/Tooltip";
import { TooltipProvider } from "@/components/ui/tooltip-ui";
import CollectionsIcon from "./icons/CollectionsIcon";

export default function Navbar() {
  const [navbarEnabled, setNavbarEnabled] = useState(false);
  const [lastKey, setLastKey] = useState("");
  const pathname = usePathname();

  useHotkeys("/", () => console.log("search"), { enabled: navbarEnabled });

  useHotkeys(
    "g",
    () => {
      setLastKey("g");
      setTimeout(() => setLastKey(""), 2000);
    },
    { enabled: navbarEnabled },
  );

  useHotkeys("h, l, c, p", () => {
    if (lastKey === "g") {
      if (isHotkeyPressed("h")) {
        setLastKey("");
        redirect("/");
      }
      if (isHotkeyPressed("e")) {
        setLastKey("");
        redirect("/explore");
      }
      if (isHotkeyPressed("c")) {
        setLastKey("");
        redirect("/collections");
      }
      if (isHotkeyPressed("l")) {
        setLastKey("");
        redirect("/library");
      }
      if (isHotkeyPressed("m")) {
        setLastKey("");
        redirect("/profile");
      }
      if (isHotkeyPressed("p")) {
        setLastKey("");
        redirect("/preferences");
      }
    }
  });

  useEffect(() => {
    switch (pathname) {
      case "/":
      case "/login":
      case "/signup":
        setNavbarEnabled(false);
        break;
      default:
        setNavbarEnabled(true);
    }
  }, [pathname]);

  const tabs = [
    {
      id: 1,
      name: "Home",
      href: "/home",
      key1: "G",
      key2: "H",
      icon: HomeIcon,
    },
    {
      id: 2,
      name: "Explore",
      href: "/explore",
      key1: "G",
      key2: "E",
      icon: Compass,
    },
    {
      id: 3,
      name: "Collections",
      href: "/collections",
      key1: "G",
      key2: "C",
      icon: CollectionsIcon,
    },
    {
      id: 4,
      name: "Library",
      href: "/library",
      key1: "G",
      key2: "L",
      icon: SquareLibrary,
    },
    {
      id: 5,
      name: "Profile",
      href: `/profile`,
      key1: "G",
      key2: "M",
      icon: CircleUserIcon,
    },
    {
      id: 6,
      name: "Preferences",
      href: "/preferences",
      key1: "G",
      key2: "P",
      icon: Bolt,
    },
  ];

  return (
    navbarEnabled && (
      <TooltipProvider>
        <div className="fixed bottom-6 left-0 right-0 mx-auto flex w-fit items-center justify-center gap-x-4">
          <nav className="shadow-small highlight-gradient flex gap-x-[26px] rounded-full border border-transparent px-4 py-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tooltip
                  key={tab.id}
                  side="top"
                  sideOffset={18}
                  content={tab.name}
                  key1={tab.key1}
                  key2={tab.key2}
                >
                  <Link
                    href={tab.href}
                    className={`relative flex items-center justify-center transition-all duration-200 ease-in-out before:absolute before:bottom-0 before:top-0 before:my-auto before:size-8 before:rounded-full before:transition-all before:duration-200 before:ease-in-out hover:text-indigo-400 before:hover:bg-white/[0.08] ${pathname === tab.href ? "text-indigo-400 before:bg-white/[0.08]" : "text-white"}`}
                  >
                    <Icon width={20} height={40} strokeWidth={1.5} />
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          <button className="shadow-small highlight-gradient relative rounded-full border border-transparent px-3 py-0.5 transition-colors duration-200 ease-in-out hover:text-indigo-400">
            <Tooltip side="top" sideOffset={18} content="Search" key1="/">
              <Search width={20} height={40} strokeWidth={1.5} />
            </Tooltip>
          </button>
        </div>
      </TooltipProvider>
    )
  );
}
