"use client";

import type { Trending } from "@/types/tmdb.types";

import { useEffect, useState } from "react";
import Link from "next/link";

import useFetchTrending from "@/hooks/useFetchTrending";

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
  const [movieData, setMovieData] = useState<Trending<"movie">[]>();
  const [tvData, setTvData] = useState<Trending<"tv">[]>();

  const movieTrendingData = useFetchTrending("movie", "week");
  const tvTrendingData = useFetchTrending("tv", "week");

  useEffect(() => {
    if (movieTrendingData && movieTrendingData.length > 18) {
      setMovieData(movieTrendingData.slice(0, 18));
    }

    if (tvTrendingData && tvTrendingData.length > 18) {
      setTvData(tvTrendingData.slice(0, 18));
    }
  }, [movieTrendingData, tvTrendingData]);

  return (
    <div className="animate-fade-in-fast">
      <section className="carousel-container group/trending">
        <h2 className="mb-3 ml-2 text-lg font-medium">Movies Making Waves</h2>
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {movieData?.map((movie) => {
              const simpleTitle = getSimpleTitle(movie.title);

              return (
                <CarouselItem
                  key={movie.id}
                  className="md:basis-1/5 xl:basis-1/6"
                >
                  <Link href={`/film/${movie.id}/${simpleTitle}`}>
                    <div className="transition-all duration-150 hover:scale-105">
                      <Poster
                        title={movie.title}
                        src={movie.posterPath}
                        fetchSize="w342"
                        width={160}
                        height={240}
                        perspectiveEnabled={false}
                        classes="animate-fade-in carousel-item md-tablet:w-[140px] md-tablet:h-[210px]"
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
        <h2 className="mb-3 ml-2 text-lg font-medium">Series Sensations</h2>
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {tvData?.map((series) => {
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
