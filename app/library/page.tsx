"use client";

import { useEffect, useState } from "react";

import { type Review } from "@/types";

import PosterGrid from "@/components/ui/PosterGrid";
import { getMovies } from "@/lib/movieReview";
import { getSeries } from "@/lib/seriesReview";

export default function Library({
  searchParams,
}: {
  searchParams: Record<string, "film" | "series" | "none">;
}) {
  const [reviews, setReviews] = useState<Review[]>();

  const filterMode = searchParams.filter || "none";

  useEffect(() => {
    (async () => {
      const movieResult = await getMovies();
      const tvResult = await getSeries();

      movieResult?.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
      tvResult?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      if (movieResult && tvResult) {
        if (filterMode === "none") {
          const result = movieResult.concat(tvResult);

          if (result.length > 0) {
            result.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            );
            setReviews(result);
          }
        } else if (filterMode === "film") {
          movieResult.length > 0 && setReviews(movieResult);
        } else if (filterMode === "series") {
          tvResult.length > 0 && setReviews(tvResult);
        }
      }
    })();
  }, [filterMode]);

  return reviews && <PosterGrid media={reviews} />;
}
