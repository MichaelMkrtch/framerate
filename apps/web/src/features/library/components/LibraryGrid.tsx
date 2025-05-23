import type { Review } from "@web/types/ratings";

import { useEffect, useRef, useState } from "react";

import PosterGrid from "@web/components/PosterGrid";
import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";
import LibraryFilters from "@web/features/library/components/LibraryFilters";
import { scrollToTop } from "@web/lib/scroll-to-top";
import { Route } from "@web/routes/library";

import { ArrowUp } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

export default function LibraryGrid({
  fetchedReviews,
}: {
  fetchedReviews: Review<"movie" | "tv">[];
}) {
  const [reviews, setReviews] = useState<Review<"movie" | "tv">[]>([]);
  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const scrollToTopBtn = useRef<HTMLButtonElement>(null);

  const { filter } = Route.useSearch();

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
    if (fetchedReviews.length > 0) {
      fetchedReviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }

    if (filter === "film") {
      if (fetchedReviews.length > 0) {
        const filtered = fetchedReviews.filter(
          (review) => review.mediaType === "movie",
        );

        return setReviews(filtered);
      }
    } else if (filter === "series") {
      if (fetchedReviews.length > 0) {
        const filtered = fetchedReviews.filter(
          (review) => review.mediaType === "tv",
        );

        return setReviews(filtered);
      }
    } else {
      setReviews(fetchedReviews);
    }
  }, [fetchedReviews, filter]);

  return (
    <>
      <div>
        <LibraryFilters />
      </div>

      <section className="animate-fade-in-fast mt-4">
        {reviews.length === 0 ? (
          <div className="mx-auto mt-32 text-center">
            <p className="text-lg font-medium">
              Log your first review to start building your personal library!
            </p>
          </div>
        ) : (
          <div className="bg-background-darker h-screen w-full rounded-md px-7 py-8">
            <PosterGrid
              media={reviews}
              classes="pb-20 grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-3.5"
            />
          </div>
        )}

        <TooltipProvider>
          <Tooltip side="top" sideOffset={12} content="Scroll to top" key1="T">
            <button
              ref={scrollToTopBtn}
              onClick={scrollToTop}
              className={`${isArrowVisible ? "animate-fade-in" : ""} fixed right-4 bottom-4 rounded-full p-2 shadow-lg transition-colors duration-200 outline-none hover:bg-white/5 ${
                isArrowVisible ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp strokeWidth={1.5} />
            </button>
          </Tooltip>
        </TooltipProvider>
      </section>
    </>
  );
}
