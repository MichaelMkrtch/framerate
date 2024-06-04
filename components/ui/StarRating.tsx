import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

import { StarIcon } from "./Icons";

export type Review = {
  id: number;
  title: string;
  rating: number;
  poster_path: string;
};

type StarRatingProps = {
  id: number;
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
};

export default function StarRating({ id, rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  const groupedStars = [
    [0.5, 1],
    [1.5, 2],
    [2.5, 3],
    [3.5, 4],
    [4.5, 5],
  ];

  const storedReview = localStorage.getItem(id.toString());

  function parseData(): Review | null {
    try {
      if (storedReview) {
        const parsedReview: Review = JSON.parse(storedReview);
        return parsedReview;
      }
    } catch (error) {
      console.log("There was an error parsing stored film data.");
    }
    return null;
  }

  useEffect(() => {
    const parsedFilm: Review | null = parseData();
    if (parsedFilm) {
      const storedRating = parsedFilm.rating;
      setRating(storedRating);
    }
  }, [storedReview]);

  function handleRating(ratingValue: number | null) {
    if (rating === ratingValue) {
      setRating(null);
      setHover(null);
      toast.info("Rating removed");
    } else {
      setRating(ratingValue);
      toast.success("Rating added");
    }
  }

  return (
    <div className="relative">
      <div className="peer flex items-center justify-center">
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
                      onClick={() => handleRating(ratingValue)}
                      className="hidden"
                    />
                    <StarIcon
                      fill={
                        ratingValue <= (hover || rating!)
                          ? "#FFD43B"
                          : "#434343"
                      }
                      classes="h-8 w-10"
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
