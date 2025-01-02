"use client";

import Link from "next/link";

import useFetchTrending from "@/hooks/useFetchTrending";
import { toast } from "sonner";

import Poster from "@/components/Poster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getSimpleTitle } from "@/lib/utils";

export default function HomeCarousel() {
  const { data: movieTrendingData, error: movieTrendingError } =
    useFetchTrending("movie", "week");
  const { data: tvTrendingData, error: tvTrendingError } = useFetchTrending(
    "tv",
    "week",
  );

  if (movieTrendingError) {
    toast.error(movieTrendingError.message, { duration: 5000 });
  } else if (tvTrendingError) {
    toast.error(tvTrendingError.message, { duration: 5000 });
  }

  if (movieTrendingData) {
    movieTrendingData.splice(18);
  }

  if (tvTrendingData) {
    tvTrendingData.splice(18);
  }

  return (
    <div className="animate-fade-in-fast">
      <section className="carousel-container group/trending">
        <h2 className="mb-3 ml-2 text-lg font-medium">Get the Popcorn</h2>
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {movieTrendingData?.map((movie) => {
              const simpleTitle = getSimpleTitle(movie.title);

              return (
                <CarouselItem
                  key={movie.id}
                  className="md:basis-1/5 xl:basis-1/6"
                >
                  <Link href={`/movie/${movie.id}/${simpleTitle}`}>
                    <div className="transition-all duration-150 hover:scale-105">
                      <Poster
                        title={movie.title}
                        src={movie.posterPath}
                        fetchSize="w342"
                        width={160}
                        height={240}
                        perspectiveEnabled={false}
                        classes="carousel-item md-tablet:w-[140px] md-tablet:h-[210px]"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="group/trending animate-fade-in-fast hidden md:group-hover/trending:flex" />
          <CarouselNext className="group/trending animate-fade-in-fast hidden md:group-hover/trending:flex" />
        </Carousel>
      </section>

      <section className="carousel-container group/trending">
        <h2 className="mb-3 ml-2 text-lg font-medium">
          Can&apos;t Stop Watching
        </h2>
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {tvTrendingData?.map((series) => {
              const simpleTitle = getSimpleTitle(series.title);

              return (
                <CarouselItem
                  key={series.id}
                  className="md:basis-1/5 xl:basis-1/6"
                >
                  <Link href={`/series/${series.id}/${simpleTitle}`}>
                    <div className="transition-all duration-150 hover:scale-105">
                      <Poster
                        title={series.title}
                        src={series.posterPath}
                        fetchSize="w342"
                        width={160}
                        height={240}
                        perspectiveEnabled={false}
                        classes="carousel-item md-tablet:w-[140px] md-tablet:h-[210px]"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="group/trending animate-fade-in-fast hidden md:group-hover/trending:flex" />
          <CarouselNext className="group/trending animate-fade-in-fast hidden md:group-hover/trending:flex" />
        </Carousel>
      </section>
    </div>
  );
}
