import Link from "next/link";

import { type Review } from "@/types";

import getSimpleTitle from "@/utils/getSimpleTitle";

import { StarIcon } from "./Icons";
import Poster from "./Poster";
import TooltipProvider from "./TooltipProvider";

type PosterGridProps = {
  reviews: Review[] | undefined;
  tooltipEnabled?: boolean;
};

export default function PosterGrid({
  reviews,
  tooltipEnabled,
}: PosterGridProps) {
  return (
    <div className="grid gap-[18px] md:grid-cols-5 lg:grid-cols-6">
      {reviews &&
        reviews.map((review) => {
          const simpleTitle = getSimpleTitle(review.title);

          const tooltipContent = (
            <div className="max-w-48">
              <div className="w-full">
                <p className="font-medium tracking-wide">{review.title}</p>
                <div className="mt-2 flex justify-end">
                  <StarIcon fill="#FFD43B" classes="h-4 w-4" />
                  <span className="ml-1 font-semibold">{review.rating}</span>
                </div>
              </div>
            </div>
          );

          return (
            <TooltipProvider
              key={review.id}
              isEnabled={tooltipEnabled}
              delay={400}
              side="bottom"
              content={tooltipContent}
            >
              <Link href={`/film/${review.id}/${simpleTitle}`}>
                <Poster
                  title={review.title}
                  src={review.poster_path}
                  fetchSize="w342"
                  width={160}
                  height={240}
                  classes="h-[264px] w-44"
                />
              </Link>
            </TooltipProvider>
          );
        })}
    </div>
  );
}
