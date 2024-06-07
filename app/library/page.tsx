"use client";

import PosterGrid from "@/components/ui/PosterGrid";
import { useEffect, useState } from "react";

import { type Review } from "@/types";

export default function Library() {
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

    getRatedFilms();
  }, []);

  return <PosterGrid reviews={reviews} />;
}
