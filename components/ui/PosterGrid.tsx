import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { type ListContent, type Review } from "@/types";

import getSimpleTitle from "@/utils/getSimpleTitle";

import { StarIcon } from "./Icons";
import Poster from "./Poster";
import TooltipProvider from "./TooltipProvider";

import { removeFromList } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

type PosterGridProps = {
  media: ListContent[] | Review[];
  tooltipEnabled?: boolean;
  mode?: "edit";
};

export default function PosterGrid({
  media,
  tooltipEnabled,
  mode,
}: PosterGridProps) {
  const { activeList } = useListsStore((state) => ({
    activeList: state.activeList,
  }));
  const { removeListContent } = useListContentStore((state) => ({
    removeListContent: state.removeListContent,
  }));

  async function handleDeleteMedia(
    mediaId: number,
    listContentId: number,
    mediaType: "movie" | "tv",
  ) {
    if (activeList) {
      removeListContent(mediaId, listContentId, mediaType);
      await removeFromList(listContentId, mediaId, mediaType);
    }
  }

  return (
    <div className="animate-fade-in-fast grid grid-cols-3 gap-2 md:grid-cols-4 md-tablet:grid-cols-5 md-tablet:gap-3 lg:grid-cols-6 lg:gap-4 xl:gap-[18px]">
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
            <TooltipProvider
              key={`${result.mediaId}-${index}`}
              isEnabled={tooltipEnabled}
              delay={400}
              side="bottom"
              content={tooltipContent}
            >
              <Link
                href={`/${mediaType}/${result.mediaId}/${simpleTitle}`}
                className={`${mode === "edit" ? "pointer-events-none" : ""} relative`}
                onClick={(event) => mode === "edit" && event?.preventDefault()}
              >
                {mode === "edit" && (
                  <div className="absolute right-1 top-1 z-10 rounded-full bg-gray-950 p-1.5">
                    <Cross2Icon
                      className="pointer-events-auto h-4 w-4 cursor-pointer text-zinc-200 transition-colors duration-150 hover:text-red-500"
                      onClick={() =>
                        "listContentId" in result &&
                        handleDeleteMedia(
                          result.mediaId,
                          result.listContentId,
                          result.mediaType,
                        )
                      }
                    />
                  </div>
                )}
                <Poster
                  title={result.title}
                  src={result.posterPath}
                  fetchSize="w342"
                  width={160}
                  height={240}
                  perspectiveEnabled={mode === "edit" ? false : true}
                  classes="xl:h-[264px] xl:w-44"
                />
              </Link>
            </TooltipProvider>
          );
        })}
    </div>
  );
}
