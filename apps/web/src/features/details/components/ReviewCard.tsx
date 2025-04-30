import type { MediaDetails } from "@web/types/details";

import { useEffect, useState } from "react";

import RatingForm from "@web/features/details/components/RatingForm";
import { useReviewStore } from "@web/store/details/review-store";

import MediaActions from "./MediaActions";

export default function ReviewCard({ media }: Record<"media", MediaDetails>) {
  const [isStoredReview, setIsStoredReview] = useState<boolean | null>(false);
  const { storedRating } = useReviewStore();
  const [avgRating, setAvgRating] = useState<number>();

  useEffect(() => {
    if (storedRating && storedRating.reviewCount > 0) {
      setIsStoredReview(storedRating.reviewCount > 0);
      setAvgRating(parseFloat(storedRating.avgRating!.toFixed(2)) ?? null);
    }
  }, [storedRating]);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="bg-background-lighter flex h-[206.5px] flex-col items-center justify-between gap-7 rounded p-3 shadow-md ring-1 ring-white/5 lg:px-5 lg:pt-4 lg:pb-5">
      <div className="flex w-full items-center justify-between">
        <h3 className={`${!isStoredReview ? "m-auto" : ""} inline font-medium`}>
          {isStoredReview
            ? "Ratings"
            : storedRating && "Leave the first review!"}
        </h3>

        <div>
          <div className="flex h-[40.5px] flex-col text-nowrap">
            {isStoredReview && avgRating && (
              <>
                <p className="font-medium">
                  <span className="font-semibold">{avgRating}</span> / 5
                </p>
                <span className="text-sm">
                  {isStoredReview
                    ? formatter.format(storedRating!.reviewCount)
                    : ""}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <RatingForm media={media} />
      <MediaActions media={media} />
    </div>
  );
}
