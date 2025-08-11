import { useEffect, useRef, useState } from 'react';

import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import {
  Bolt,
  CircleUserIcon,
  // Compass,
  Search,
  SquareLibrary,
} from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import CollectionsIcon from '@/components/icons/collections-icon';
import HomeIcon from '@/components/icons/home-icon';
import Tooltip from '@/components/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip-ui';
import SearchBar from '@/features/search/components/search-bar';
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogDescription,
  SearchDialogHeader,
  SearchDialogTitle,
  SearchDialogTrigger,
} from '@/features/search/components/search-dialog';
import SearchResultList from '@/features/search/components/search-result-list';

export default function Navbar() {
  const [navbarEnabled, setNavbarEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchBtn = useRef<HTMLButtonElement>(null);
  const lastKeyRef = useRef('');

  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  useHotkeys(
    'slash',
    (event) => {
      event.preventDefault();
      searchBtn.current?.click();
    },
    { enabled: navbarEnabled },
  );

  useHotkeys(
    'g',
    () => {
      lastKeyRef.current = 'g';
    },
    { enabled: navbarEnabled },
  );

  useHotkeys(
    'h, e, c, l, m, p',
    (event, _handler) => {
      if (lastKeyRef.current === 'g') {
        lastKeyRef.current = '';

        const pressedKey = event.key;

        switch (pressedKey) {
          case 'h':
            navigate({ to: '/home' });
            break;
          // case "e":
          //   navigate({ to: "/explore" });
          //   break;
          case 'c':
            navigate({ to: '/collections' });
            break;
          case 'l':
            navigate({ to: '/library', search: { filter: undefined } });
            break;
          case 'm':
            navigate({ to: '/profile' });
            break;
          case 'p':
            navigate({ to: '/preferences' });
            break;
        }
      }
    },
    {
      enabled: navbarEnabled,
    },
  );

  useEffect(() => {
    switch (pathname) {
      case '/':
      case '/login':
      case '/signup':
        setNavbarEnabled(false);
        break;
      default:
        setNavbarEnabled(true);
    }
  }, [pathname]);

  const tabs = [
    {
      id: 1,
      name: 'Home',
      href: '/home',
      key1: 'G',
      key2: 'H',
      icon: HomeIcon,
    },
    // {
    //   id: 2,
    //   name: "Explore",
    //   href: "/explore",
    //   key1: "G",
    //   key2: "E",
    //   icon: Compass,
    // },
    {
      id: 3,
      name: 'Collections',
      href: '/collections',
      key1: 'G',
      key2: 'C',
      icon: CollectionsIcon,
    },
    {
      id: 4,
      name: 'Library',
      href: '/library',
      key1: 'G',
      key2: 'L',
      icon: SquareLibrary,
    },
    {
      id: 5,
      name: 'Profile',
      href: `/profile`,
      key1: 'G',
      key2: 'M',
      icon: CircleUserIcon,
    },
    {
      id: 6,
      name: 'Preferences',
      href: '/preferences',
      key1: 'G',
      key2: 'P',
      icon: Bolt,
    },
  ];

  return (
    navbarEnabled && (
      <TooltipProvider>
        <div className="fixed right-0 bottom-6 left-0 z-50 mx-auto flex w-fit items-center justify-center gap-x-4">
          <nav className="before:bg-background-lighter/85 relative flex gap-x-[26px] rounded-full border border-white/5 px-4 py-0.5 shadow-md backdrop-blur-lg before:absolute before:top-0 before:left-0 before:size-full before:rounded-full">
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
                      className: 'text-[#522aff] before:bg-white/5',
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

          <SearchDialog>
            <SearchDialogTrigger asChild>
              <button
                ref={searchBtn}
                className="before:bg-background-lighter/85 relative rounded-full border border-white/5 px-3 py-0.5 shadow-sm outline-0 backdrop-blur-lg transition-colors duration-200 ease-in-out before:absolute before:top-0 before:left-0 before:size-full before:rounded-full hover:text-[#522aff]"
              >
                <Tooltip side="top" sideOffset={18} content="Search" key1="/">
                  <Search
                    width={20}
                    height={40}
                    strokeWidth={1.5}
                    className="relative"
                  />
                </Tooltip>
              </button>
            </SearchDialogTrigger>

            <SearchDialogContent>
              <SearchDialogHeader className="sr-only">
                <SearchDialogTitle>Search</SearchDialogTitle>
                <SearchDialogDescription>
                  Search for a movie or tv series by name.
                </SearchDialogDescription>
              </SearchDialogHeader>

              <SearchResultList searchQuery={searchQuery} />
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </SearchDialogContent>
          </SearchDialog>
        </div>
      </TooltipProvider>
    )
  );
}
