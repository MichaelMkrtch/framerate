"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bolt, LibraryBig, Scroll } from "lucide-react";

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
      <div className="textured-dark fixed bottom-8 left-0 right-0 mx-auto w-fit rounded-full border border-transparent px-[18px] py-0.5">
        <nav className="flex items-center justify-center gap-x-7">
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
                <Link href={tab.href}>
                  <Icon width={22} height={40} strokeWidth={1.5} />
                </Link>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    )
  );
}
