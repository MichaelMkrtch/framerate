"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Bolt, LibraryBig, Scroll, Search } from "lucide-react";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";

import HomeIcon from "@/components/icons/HomeIcon";
import Tooltip from "@/components/Tooltip";

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
      if (isHotkeyPressed("l")) {
        setLastKey("");
        redirect("/lists");
      }
      if (isHotkeyPressed("c")) {
        setLastKey("");
        redirect("/collection");
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
      name: "Lists",
      href: "/lists",
      key1: "G",
      key2: "L",
      icon: Scroll,
    },
    {
      id: 3,
      name: "Collection",
      href: "/collection",
      key1: "G",
      key2: "C",
      icon: LibraryBig,
    },
    {
      id: 4,
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
        <div className="fixed bottom-8 left-0 right-0 mx-auto flex w-fit items-center justify-center gap-x-4">
          <nav className="shadow-small highlight-gradient flex gap-x-7 rounded-full border border-transparent px-[18px] py-0.5">
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
                    className={`relative flex items-center justify-center transition-all duration-200 ease-in-out hover:text-indigo-400 ${pathname === tab.href ? "text-indigo-400" : "text-white"}`}
                  >
                    <Icon width={22} height={40} strokeWidth={1.5} />
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          <button className="shadow-small highlight-gradient rounded-full border border-transparent px-3 py-0.5 transition-colors duration-200 ease-in-out hover:text-indigo-400">
            <Tooltip side="top" sideOffset={18} content="Search" key1="/">
              <Search width={22} height={40} strokeWidth={1.5} />
            </Tooltip>
          </button>
        </div>
      </TooltipProvider>
    )
  );
}
