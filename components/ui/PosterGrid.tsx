"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import simplifyTitle from "@/utils/simplifyTitle";

import { StarIcon } from "./Icons";
import IconsTooltip from "./IconsTooltip";
import Poster from "./Poster";
import { type Review } from "./StarRating";

export default function PosterGrid() {
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    function getRatedFilms() {
      const allKeysJSON = Object.keys(localStorage);
      const reviewsJSON = allKeysJSON.map((key) => localStorage.getItem(key));
      const parsedReviews: Review[] = reviewsJSON.map((review) => {
        if (review) return JSON.parse(review);
      });
      const filteredReviews: Review[] = parsedReviews.filter(
        (review) => review.rating,
      );
      setReviews(filteredReviews);
    }

    window.addEventListener("storage", () => {
      getRatedFilms();
    });

    getRatedFilms();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-6">
      {reviews &&
        reviews.map((review) => {
          const simpleTitle = simplifyTitle(review.title);

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
            <IconsTooltip side="bottom" content={tooltipContent}>
              <Link key={review.id} href={`/film/${review.id}/${simpleTitle}`}>
                <Poster
                  title={review.title}
                  src={review.poster_path}
                  fetchSize="w342"
                  width={160}
                  height={240}
                  classes="h-[264px] w-44"
                />
              </Link>
            </IconsTooltip>
          );
        })}
    </div>
  );
}
