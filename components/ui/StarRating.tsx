import { useState } from "react";

import { StarIcon } from "./Icons";

export default function StarRating() {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const groupedStars = [
    [0.5, 1],
    [1.5, 2],
    [2.5, 3],
    [3.5, 4],
    [4.5, 5],
  ];

  return (
    <div className="flex items-center justify-center">
      {groupedStars.map((group, index) => {
        return (
          <span
            key={index}
            className="relative transition-transform duration-100 ease-out hover:scale-[1.15]"
          >
            {group.map((star, index) => {
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
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <StarIcon
                    fill={
                      ratingValue <= (hover || rating!) ? "#FFD43B" : "#434343"
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
  );
}
