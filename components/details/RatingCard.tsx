import { useEffect, useState } from "react";

import { type Film } from "@/types";

import getFormattedDate from "@/utils/getFormattedDate";
import parseData from "@/utils/parseData";

import Card from "../ui/Card";
import { StarIcon } from "../ui/Icons";
import StarRating from "../ui/StarRating";
import IconsSection from "./IconsSection";

type RatingCardProps = {
  film: Film;
};

export default function RatingCard({ film }: RatingCardProps) {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const date = new Date();
    const formattedDate = getFormattedDate(date);

    const review = {
      id: film.id,
      title: film.title,
      rating,
      poster_path: film.poster_path,
      date: formattedDate,
    };

    const storedReview = localStorage.getItem(film.id.toString());
    const parsedReview = parseData(storedReview);

    if (rating && parsedReview === null) {
      const reviewJSON = JSON.stringify(review);
      localStorage.setItem(film.id.toString(), reviewJSON);
    } else if (rating && parsedReview) {
      parsedReview.rating = rating;
      const reviewJSON = JSON.stringify(parsedReview);
      localStorage.setItem(film.id.toString(), reviewJSON);
    }
  }, [film.id, film.title, rating, film.poster_path]);

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
            <span className="text-sm">
              {(Math.floor(Math.random() * 100_000) / 1e3).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>
      <StarRating id={film.id} rating={rating} setRating={setRating} />
      <IconsSection />
    </Card>
  );
}
