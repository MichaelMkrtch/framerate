"use client";

import { useEffect, useState } from "react";

import { type Review } from "@/types";

import PosterGrid from "@/components/ui/PosterGrid";
import { getMovies } from "@/lib/movieReview";
import { getSeries } from "@/lib/seriesReview";

export default function Library() {
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    (async () => {
      const movieResult = await getMovies();
      const tvResult = await getSeries();

      if (movieResult && tvResult) {
        const result = movieResult.concat(tvResult);

        if (result.length > 0) {
          result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          setReviews(result);
        }
      }
    })();
  }, []);

  return <PosterGrid reviews={reviews} />;
}
