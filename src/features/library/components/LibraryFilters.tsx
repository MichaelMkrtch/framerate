import { useRef } from "react";
import Link from "next/link";

import { useHotkeys } from "react-hotkeys-hook";

import Tooltip from "@/components/Tooltip";
import { TooltipProvider } from "@/components/ui/tooltip-ui";

export default function LibraryFilters({
  filter,
}: {
  filter: "film" | "series" | null;
}) {
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
            href="/library"
            scroll={false}
            shallow={true}
            className={`${filter === null && "highlight-gradient border border-transparent font-semibold text-foreground"} library-filter-btn`}
          >
            All
          </Link>
        </Tooltip>

        <Tooltip content="Show Films" side="top" sideOffset={12} key1="F">
          <Link
            ref={filmLinkRef}
            href="/library?filter=film"
            scroll={false}
            shallow={true}
            className={`${filter === "film" && "highlight-gradient border border-transparent font-semibold text-foreground"} library-filter-btn`}
          >
            Film
          </Link>
        </Tooltip>

        <Tooltip content="Show Series" side="top" sideOffset={12} key1="S">
          <Link
            ref={seriesLinkRef}
            href="/library?filter=series"
            scroll={false}
            shallow={true}
            className={`${filter === "series" && "highlight-gradient border border-transparent font-semibold text-foreground"} library-filter-btn`}
          >
            Series
          </Link>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
