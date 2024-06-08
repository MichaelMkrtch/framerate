import Link from "next/link";

import { type Review } from "@/types";

import getSimpleTitle from "@/utils/getSimpleTitle";

import { StarIcon } from "./Icons";
import Poster from "./Poster";
import TooltipProvider from "./TooltipProvider";

type PosterGridProps = {
  reviews?: Review[];
  tooltipEnabled?: boolean;
};

export default function PosterGrid({
  reviews,
  tooltipEnabled,
}: PosterGridProps) {
  return (
    <div className="grid gap-[18px] md:grid-cols-5 lg:grid-cols-6">
      {reviews &&
        reviews.map((result) => {
          const simpleTitle = getSimpleTitle(result.title);

          const tooltipContent = (
            <div className="max-w-48">
              <div className="w-full">
                <p className="font-medium tracking-wide">{result.title}</p>
                <div className="mt-2 flex justify-end">
                  <StarIcon fill="#FFD43B" classes="h-4 w-4" />
                  <span className="ml-1 font-semibold">{result.rating}</span>
                </div>
              </div>
            </div>
          );

          return (
            <TooltipProvider
              key={result.id}
              isEnabled={tooltipEnabled}
              delay={400}
              side="bottom"
              content={tooltipContent}
            >
              <Link href={`/result/${result.id}/${simpleTitle}`}>
                <Poster
                  title={result.title}
                  src={result.poster_path}
                  fetchSize="w342"
                  width={160}
                  height={240}
                  perspectiveEnabled={true}
                  classes="h-[264px] w-44"
                />
              </Link>
            </TooltipProvider>
          );
        })}
    </div>
  );
}
