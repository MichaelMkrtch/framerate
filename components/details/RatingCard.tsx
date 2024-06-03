import { useEffect, useState } from "react";

import { type Film } from "@/types";

import Card from "../ui/Card";
import { StarIcon } from "../ui/Icons";
import StarRating from "../ui/StarRating";
import IconsSection from "./IconsSection";

type RatingCardProps = {
  film: Film;
};

export default function RatingCard({ film }: RatingCardProps) {
  const [rating, setRating] = useState<number | null>(null);

  const review = { id: film.id, rating };

  useEffect(() => {
    if (review.rating) {
      const reviewJSON = JSON.stringify(review);
      localStorage.setItem(film.id.toString(), reviewJSON);
      window.dispatchEvent(new Event("storage"));
    }
  }, [rating]);

  return (
    <Card>
      <div className="mx-0.5 mb-8 flex items-center justify-between">
        <h3 className="inline font-medium">Ratings</h3>
        <div className="flex items-center">
          <StarIcon fill="#FFD43B" classes="h-6 w-6" />
          <div className="flex flex-col pl-2">
            <p className="text-center">
              <span className="font-semibold">
                {(Math.random() * 4.5 + 0.5).toFixed(1)}
              </span>
              <span className="font-noto font-medium"> / </span>5
            </p>
            <span className="text-sm">13k</span>
          </div>
        </div>
      </div>
      <StarRating id={film.id} rating={rating} setRating={setRating} />
      <IconsSection />
    </Card>
  );
}
