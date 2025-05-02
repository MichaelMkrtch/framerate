import type { ListItem } from "@web/types/lists";
import type { Review } from "@web/types/ratings";

import { Link } from "@tanstack/react-router";

import { StarIcon } from "@web/components/icons/StarIcon";
import Poster from "@web/components/Poster";
import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";
import { Route as filmRoute } from "@web/routes/films/$id.$title";
import { Route as seriesRoute } from "@web/routes/series/$id.$title";
import { getSimpleTitle } from "@web/utils/strings";

type PosterGridProps = {
  media: ListItem[] | Review<"movie" | "tv">[];
  isTooltipEnabled?: boolean;
  classes: string;
};

export default function PosterGrid({
  media,
  isTooltipEnabled,
  classes,
}: PosterGridProps) {
  return (
    <div className={`${classes} animate-fade-in-fast grid`}>
      {media &&
        media.map((result, index) => {
          const mediaType = result.mediaType === "movie" ? "film" : "series";
          const route =
            mediaType === "film" ? filmRoute.fullPath : seriesRoute.fullPath;

          const simpleTitle = getSimpleTitle(result.title);
          const rating = "rating" in result && parseFloat(result.rating);
          const loadingStrategy = index < 24 ? "eager" : "lazy";

          const tooltipContent = (
            <div className="max-w-48">
              <div className="w-full">
                <p className="font-semibold tracking-wide">{result.title}</p>
                <div className="my-1 flex justify-start">
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
                classes="bg-background-lighter border-white/10"
              >
                <Link
                  to={route}
                  params={{ id: result.mediaId.toString(), title: simpleTitle }}
                  preload={false}
                  className="relative"
                >
                  <Poster
                    title={result.title}
                    src={result.posterPath}
                    fetchSize="w342"
                    width={160}
                    height={240}
                    perspectiveEnabled={true}
                    loading={loadingStrategy}
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
