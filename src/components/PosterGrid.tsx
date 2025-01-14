import type { ListItem, Review } from "@/types/data.types";

import Link from "next/link";

import { StarIcon } from "@/components/icons/StarIcon";
import Poster from "@/components/Poster";
import Tooltip from "@/components/Tooltip";
import { TooltipProvider } from "@/components/ui/tooltip-ui";
import { getSimpleTitle } from "@/lib/utils";

type PosterGridProps = {
  media: ListItem[] | Review[];
  isTooltipEnabled: boolean;
};

export default function PosterGrid({
  media,
  isTooltipEnabled,
}: PosterGridProps) {
  return (
    <div className="grid animate-fade-in-fast grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
      {media &&
        media.map((result, index) => {
          const simpleTitle = getSimpleTitle(result.title);
          const rating = "rating" in result && parseFloat(result.rating);
          const mediaType = result.mediaType === "movie" ? "film" : "series";

          const tooltipContent = (
            <div className="max-w-48">
              <div className="w-full">
                <p className="font-medium tracking-wide">{result.title}</p>
                <div className="flex justify-end">
                  <StarIcon fill="#FFD43B" classes="h-4 w-4" />
                  <span className="ml-1 font-semibold">{rating}</span>
                </div>
              </div>
            </div>
          );

          return (
            <TooltipProvider key={`${result.mediaId}-${index}`}>
              <Tooltip
                key={`${result.mediaId}-${index}`}
                sideOffset={25}
                side="bottom"
                content={tooltipContent}
                isEnabled={isTooltipEnabled}
              >
                <Link
                  href={`/${mediaType}/${result.mediaId}/${simpleTitle}`}
                  className="relative"
                >
                  <Poster
                    title={result.title}
                    src={result.posterPath}
                    fetchSize="w342"
                    width={160}
                    height={240}
                    perspectiveEnabled={true}
                    classes="xl:h-[264px] xl:w-44"
                  />
                </Link>
              </Tooltip>
            </TooltipProvider>
          );
        })}
    </div>
  );
}
