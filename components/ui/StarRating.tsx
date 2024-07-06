import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

import { type Media } from "@/types";

import { StarIcon } from "./Icons";

import { validateRequest } from "@/lib/auth";
import { deleteMovieReview, getMovieRating } from "@/lib/movieReview";
import { deleteSeriesReview, getSeriesRating } from "@/lib/seriesReview";

type StarRatingProps = {
  media: Media;
  rating?: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
  handleRating: () => Promise<void>;
};

export default function StarRating({
  media,
  rating,
  setRating,
  handleRating,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  const groupedStars = [
    [0.5, 1],
    [1.5, 2],
    [2.5, 3],
    [3.5, 4],
    [4.5, 5],
  ];

  useEffect(() => {
    (async () => {
      const result =
        media.mediaType === "movie"
          ? await getMovieRating({ movieId: media.id })
          : await getSeriesRating({ seriesId: media.id });
      if (result && result.length > 0 && result[0].rating !== null) {
        const dbRating = parseFloat(result[0].rating);
        setRating(dbRating);
      }
    })();
  }, [media.id, media.mediaType, setRating]);

  async function handleClick(ratingValue: number) {
    const result = await validateRequest();
    if (rating === ratingValue && result.user) {
      setRating(null);
      setHover(null);
      media.mediaType === "movie" &&
        (await deleteMovieReview({ movieId: media.id }));
      media.mediaType === "tv" &&
        (await deleteSeriesReview({ seriesId: media.id }));
      toast.info("Rating removed");
    } else {
      setRating(ratingValue);
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
                        ratingValue <= (hover || rating!)
                          ? "#FFD43B"
                          : "#434343"
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
