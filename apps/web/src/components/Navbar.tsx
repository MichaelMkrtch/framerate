import type { Media } from "@web/types/tmdb-types";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import CollectionsIcon from "@web/components/icons/CollectionsIcon";
import HomeIcon from "@web/components/icons/HomeIcon";
import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";

// // import SearchBar from "@web/components/search/SearchBar";
// import {
//   SearchDialog,
//   SearchDialogContent,
//   SearchDialogDescription,
//   SearchDialogHeader,
//   SearchDialogTitle,
//   SearchDialogTrigger,
// } from "@web/components/search/SearchDialog";
// import SearchResultList from "@web/components/search/SearchResultList";
// import Tooltip from "@web/components/Tooltip";
// import { TooltipProvider } from "@web/components/ui/tooltip-ui";
// import useFetchDetails from "@web/hooks/useFetchDetails";
// import useFetchTrending from "@web/hooks/useFetchTrending";
// import useSearch from "@web/hooks/useSearch";
// import { Media } from "@web/types/tmdb.types";

import {
  Bolt,
  CircleUserIcon,
  Compass,
  Search,
  SquareLibrary,
} from "lucide-react";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";

export default function Navbar() {
  const [navbarEnabled, setNavbarEnabled] = useState(false);
  const [lastKey, setLastKey] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Media[]>([]);

  const searchBtn = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  // const trendingData = useFetchTrending("all", "day");
  // const detailsData = useFetchDetails(results);
  // const { searchData, isFetching } = useSearch(searchQuery);

  // useEffect(() => {
  //   if (trendingData && !isFetching) {
  //     setResults(trendingData.slice(0, 10));
  //   }

  //   if (searchData && searchData.results) {
  //     setResults(searchData.results);
  //   }
  // }, [trendingData, searchData, isFetching]);

  useHotkeys(
    "/",
    (event) => {
      event.preventDefault();
      searchBtn.current?.click();
    },
    { enabled: navbarEnabled },
  );

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
        navigate({ to: "/home" });
      }
      if (isHotkeyPressed("e")) {
        setLastKey("");
        navigate({ to: "/explore" });
      }
      if (isHotkeyPressed("c")) {
        setLastKey("");
        navigate({ to: "/collections" });
      }
      if (isHotkeyPressed("l")) {
        setLastKey("");
        navigate({ to: "/library" });
      }
      if (isHotkeyPressed("m")) {
        setLastKey("");
        navigate({ to: "/profile" });
      }
      if (isHotkeyPressed("p")) {
        setLastKey("");
        navigate({ to: "/preferences" });
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
        <div className="fixed right-0 bottom-6 left-0 z-50 mx-auto flex w-fit items-center justify-center gap-x-4">
          <nav className="bg-background-lighter flex gap-x-[26px] rounded-full border border-white/5 px-4 py-0.5 shadow-md">
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
                    to={tab.href}
                    activeProps={{
                      className: "text-[#522aff] before:bg-white/5",
                    }}
                    activeOptions={{ exact: true }}
                    className="relative flex items-center justify-center transition-all duration-200 ease-in-out before:absolute before:top-0 before:bottom-0 before:my-auto before:size-8 before:rounded-full before:transition-all before:duration-200 before:ease-in-out hover:text-[#522aff] focus:outline-[#522aff]"
                  >
                    <Icon width={20} height={40} strokeWidth={1.5} />
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          {/* <SearchDialog>
            <SearchDialogTrigger asChild>
              <button
                ref={searchBtn}
                className="shadow-small bg-background-accent relative rounded-full border border-white/5 px-3 py-0.5 outline-0 transition-colors duration-200 ease-in-out hover:text-[#522aff]"
              >
                <Tooltip side="top" sideOffset={18} content="Search" key1="/">
                  <Search width={20} height={40} strokeWidth={1.5} />
                </Tooltip>
              </button>
            </SearchDialogTrigger>

            <SearchDialogContent>
              <SearchDialogHeader>
                <SearchDialogTitle>Search</SearchDialogTitle>
                <SearchDialogDescription>
                  Search for a movie or tv series by name.
                </SearchDialogDescription>
              </SearchDialogHeader>

              <SearchResultList results={detailsData} />
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </SearchDialogContent>
          </SearchDialog> */}
        </div>
      </TooltipProvider>
    )
  );
}
