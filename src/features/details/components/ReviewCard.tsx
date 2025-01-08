import type { Details } from "@/types/tmdb.types";

import { useEffect, useState } from "react";

import { useReviewStore } from "@/store/details/review-store";
import RatingForm from "@/features/details/components/RatingForm";
import MediaActions from "./MediaActions";

export default function ReviewCard({ media }: Record<"media", Details>) {
  const [isStoredReview, setIsStoredReview] = useState<boolean | null>(false);
  const [avgRating, setAvgRating] = useState<number>();
  const storedRating = useReviewStore((state) => state.storedRating);

  useEffect(() => {
    if (storedRating && storedRating?.reviewCount > 0) {
      setIsStoredReview(storedRating.reviewCount > 0);
      setAvgRating(parseFloat(storedRating.avgRating.toFixed(2)));
    }
  }, [storedRating]);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="flex h-[206.5px] flex-col items-center justify-between gap-7 rounded bg-background-lighter p-3 shadow-md ring-1 ring-white/5 lg:px-5 lg:pb-5 lg:pt-4">
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
