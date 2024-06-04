"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          const simpleTitle = review.title
            .replaceAll(/[^a-zA-Z0-9 ]/g, "")
            .replaceAll(/\s{2,}/g, "-")
            .replaceAll(" ", "-")
            .toLowerCase();

          return (
            <Link href={`/film/${review.id}/${simpleTitle}`}>
              <Poster
                key={review.id}
                title={review.title}
                src={review.poster_path}
                fetchSize="w342"
                width={160}
                height={240}
              />
            </Link>
          );
        })}
    </div>
  );
}
