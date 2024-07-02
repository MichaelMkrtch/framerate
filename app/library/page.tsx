"use client";

import { useEffect, useState } from "react";

import { type Review } from "@/types";

import PosterGrid from "@/components/ui/PosterGrid";
import { getMovies } from "@/lib/review";

export default function Library() {
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    (async () => {
      const result = await getMovies();
      if (result && result.length > 0) {
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setReviews(result);
      }
    })();
  }, []);

  return <PosterGrid reviews={reviews} />;
}
