"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Bolt, LibraryBig, Scroll, Search } from "lucide-react";

import HomeIcon from "@/components/icons/HomeIcon";
import Tooltip from "@/components/Tooltip";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { id: 1, name: "Home", href: "/", key1: "G", key2: "H", icon: HomeIcon },
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
    pathname !== "/" && (
      <TooltipProvider>
        <div className="fixed bottom-8 left-0 right-0 mx-auto flex w-fit items-center justify-center gap-x-4">
          <nav className="navbar-gradient flex gap-x-7 rounded-full border border-transparent px-[18px] py-0.5">
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
                    className="relative flex items-center justify-center transition-all duration-200 before:absolute before:-z-10 before:size-9 before:rounded-full before:opacity-0 before:transition-all before:duration-200 before:ease-out hover:text-indigo-400 before:hover:bg-white/15 before:hover:opacity-35"
                  >
                    <Icon width={22} height={40} strokeWidth={1.5} />
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          <div className="navbar-gradient rounded-full border border-transparent px-3 py-0.5">
            <Tooltip side="top" sideOffset={18} content="Search" key1="/">
              <Search width={22} height={40} strokeWidth={1.5} />
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    )
  );
}
