import { type User } from "lucia";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { ListItem } from "./Header";
import { AvatarIcon } from "./Icons";

import { logout } from "@/actions/auth-actions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/Navigation-Menu";
import { useUserStore } from "@/store/userStore";

type NavBarProps = {
  isMobile: boolean;
  user: User | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NavBar({
  isMobile,
  user,
  isOpen,
  setIsOpen,
}: NavBarProps) {
  const [activePath, setActivePath] = useState<string>();
  const [linkName, setLinkName] = useState<string>("");
  const pathname = usePathname();
  const ref = useRef(null);

  const { username } = useUserStore((state) => ({
    username: state.username,
  }));

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
    } else if (
      pathname === "/library" ||
      pathname.includes("/film/") ||
      pathname.includes("/series/")
    ) {
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
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setActivePath(undefined);
  }

  function handleClickOutside() {
    if (isMobile) {
      setActivePath(pathname);
      setIsOpen(false);
    }
  }

  useOnClickOutside(ref, handleClickOutside);

  return (
    <nav>
      <ul
        ref={ref}
        className="flex h-10 items-center rounded-full bg-zinc-800/45 px-1 text-sm font-medium tracking-wide ring-1 ring-white/10 backdrop-blur"
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
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="!bg-transparent !p-0">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            <AvatarIcon
                              fill="#52525b"
                              classes="h-7 w-5 opacity-[55%]"
                            />
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="m-auto px-3 py-2">
                        <ul>
                          <li className="mb-2">
                            <NavigationMenuLink
                              href={`/${username}/lists`}
                              className="text-nowrap text-sm"
                            >
                              Your lists
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink>
                              <form action={logout}>
                                <button className="">Logout</button>
                              </form>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : null}
          </>
        )}
      </ul>
    </nav>
  );
}
