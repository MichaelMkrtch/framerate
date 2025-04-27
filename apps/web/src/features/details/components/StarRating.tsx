import type { MediaDetails } from "@web/types/details";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";

import { StarIcon } from "@web/components/icons/StarIcon";
import { authClient } from "@web/lib/auth-client";
import { useReviewStore } from "@web/store/details/review-store";

// import { deleteMovieReview, getMovieRating } from "../server/db/movie";
// import { deleteSeriesReview, getSeriesRating } from "../server/db/series";
import { toast } from "sonner";

type StarRatingProps = {
  media: MediaDetails;
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
  handleRating: () => Promise<void>;
};

export default function StarRating({
  media,
  rating,
  setRating,
  handleRating,
}: StarRatingProps) {
  const { setIsWatched, clearMediaActions } = useReviewStore();
  const [hover, setHover] = useState<number | null>(null);

  const groupedStars = [
    [0.5, 1],
    [1.5, 2],
    [2.5, 3],
    [3.5, 4],
    [4.5, 5],
  ];

  // useEffect(() => {
  //   (async () => {
  //     const result =
  //       media.mediaType === "movie"
  //         ? await getMovieRating(media.id)
  //         : await getSeriesRating(media.id);
  //     if (result && result.rating !== null) {
  //       const dbRating = parseFloat(result.rating);
  //       setRating(dbRating);
  //     }
  //   })();
  // }, [media.id, media.mediaType, setRating]);

  async function handleClick(ratingValue: number) {
    const session = await authClient.getSession();

    if (rating === ratingValue && session?.data?.user) {
      setRating(null);
      setHover(null);
      clearMediaActions();
      // if (media.mediaType === "movie") await deleteMovieReview(media.id);
      // if (media.mediaType === "tv") await deleteSeriesReview(media.id);
      toast.info("Rating removed");
    } else {
      setRating(ratingValue);
      setIsWatched(true);
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {groupedStars.map((group, index) => {
          return (
            <span
              key={index}
              className="relative transition-transform duration-100 ease-out hover:scale-[1.15] active:scale-105"
            >
              {group.map((star) => {
                const ratingValue = star;

                return (
                  <label
                    key={ratingValue}
                    className={`${ratingValue % 1 !== 0 ? "absolute w-[50%] overflow-hidden" : ""}`}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => {
                        handleClick(ratingValue);
                        if (rating !== ratingValue) handleRating();
                      }}
                      className="hidden"
                    />
                    <StarIcon
                      fill={
                        ratingValue <= (hover || rating!) ? "#FFD43B" : "#333"
                      }
                      classes="h-8 w-10 md:h-7 md:w-9 lg:h-8 lg:w-10"
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
