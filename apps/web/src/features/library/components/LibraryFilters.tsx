import { useRef } from "react";
import { Link } from "@tanstack/react-router";

import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";
import { Route } from "@web/routes/library";

import { useHotkeys } from "react-hotkeys-hook";

export default function LibraryFilters() {
  const { filter } = Route.useSearch();

  const allLinkRef = useRef<HTMLAnchorElement>(null);
  const filmLinkRef = useRef<HTMLAnchorElement>(null);
  const seriesLinkRef = useRef<HTMLAnchorElement>(null);

  useHotkeys("a", () => {
    allLinkRef.current?.click();
  });

  useHotkeys("f", () => {
    filmLinkRef.current?.click();
  });

  useHotkeys("s", () => {
    seriesLinkRef.current?.click();
  });

  return (
    <div className="flex justify-end gap-3">
      <TooltipProvider>
        <Tooltip content="Show All" side="top" sideOffset={12} key1="A">
          <Link
            ref={allLinkRef}
            to="/library"
            search={{ filter: undefined }}
            className={`${filter === undefined && "background-highlight-gradient text-foreground border border-transparent font-semibold"} library-filter-btn`}
          >
            All
          </Link>
        </Tooltip>

        <Tooltip content="Show Films" side="top" sideOffset={12} key1="F">
          <Link
            ref={filmLinkRef}
            to="/library"
            search={{ filter: "film" }}
            activeProps={{
              className:
                "background-highlight-gradient text-foreground border border-transparent font-semibold",
            }}
            className="library-filter-btn"
          >
            Film
          </Link>
        </Tooltip>

        <Tooltip content="Show Series" side="top" sideOffset={12} key1="S">
          <Link
            ref={seriesLinkRef}
            to="/library"
            search={{ filter: "series" }}
            activeProps={{
              className:
                "background-highlight-gradient text-foreground border border-transparent font-semibold",
            }}
            className="library-filter-btn"
          >
            Series
          </Link>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
