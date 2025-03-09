"use client";

import { use, useEffect, useRef, useState } from "react";

import { Review } from "@/types/data.types";
import { ArrowUp } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import PosterGrid from "@/components/PosterGrid";
import Tooltip from "@/components/Tooltip";
import { TooltipProvider } from "@/components/ui/tooltip-ui";
import { getReviewedMovies } from "@/features/details/server/db/movie";
import { getReviewedSeries } from "@/features/details/server/db/series";
import LibraryFilters from "@/features/library/components/LibraryFilters";
import { scrollToTop } from "@/lib/utils";

export default function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [filter: string]: "film" | "series" | undefined }>;
}) {
  const params = use(searchParams);
  const filter = params.filter ?? null;
  console.log(filter);

  const [reviews, setReviews] = useState<Review<"movie" | "tv">[]>([]);
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const scrollToTopBtn = useRef<HTMLButtonElement>(null);

  useHotkeys("t", () => {
    scrollToTopBtn.current?.click();
  });

  useEffect(() => {
    const toggleVisibility = () => {
      setIsArrowVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const reviewedMovies = await getReviewedMovies();
      const reviewedSeries = await getReviewedSeries();

      if (reviewedMovies && reviewedSeries) {
        if (!filter) {
          const combinedReviews = [...reviewedMovies, ...reviewedSeries];

          if (combinedReviews.length > 0) {
            combinedReviews.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            );
            setReviews(combinedReviews);
          }
        }

        if (filter === "film") {
          if (reviewedMovies.length > 0) {
            reviewedMovies.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            );
            setReviews(reviewedMovies);
          }
        }

        if (filter === "series") {
          if (reviewedSeries.length > 0) {
            reviewedSeries.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            );
            setReviews(reviewedSeries);
          }
        }
      }
    })();
  }, [filter]);

  return (
    reviews.length > 0 && (
      <>
        <div>
          <LibraryFilters filter={filter} />
        </div>

        <main className="mt-4 animate-fade-in-fast rounded-md bg-background-darker px-7 py-8">
          <PosterGrid
            media={reviews}
            classes="grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-3.5"
          />

          <TooltipProvider>
            <Tooltip
              side="top"
              sideOffset={12}
              content="Scroll to top"
              key1="T"
            >
              <button
                ref={scrollToTopBtn}
                onClick={scrollToTop}
                className={`${isArrowVisible ? "animate-fade-in" : ""} fixed bottom-4 right-4 rounded-full p-2 shadow-lg outline-none transition-colors duration-200 hover:bg-white/5 ${
                  isArrowVisible
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-label="Scroll to top"
              >
                <ArrowUp strokeWidth={1.5} />
              </button>
            </Tooltip>
          </TooltipProvider>
        </main>
      </>
    )
  );
}
