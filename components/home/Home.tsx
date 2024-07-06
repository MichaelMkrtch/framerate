"use client";

import Link from "next/link";

import useFetchTrending from "@/hooks/useFetchTrending";

import getSimpleTitle from "@/utils/getSimpleTitle";

import Poster from "../ui/Poster";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

export default function Trending() {
  let movieTrendingData = useFetchTrending("movie", "week");
  let tvTrendingData = useFetchTrending("tv", "week");

  if (movieTrendingData) {
    movieTrendingData = movieTrendingData.slice(0, 18);
  }

  if (tvTrendingData) {
    tvTrendingData = tvTrendingData.slice(0, 18);
  }

  return (
    <>
      <section className="mb-14">
        <h2 className="mb-3 text-lg font-medium">
          Everyone&apos;s Watching...
        </h2>
        <Carousel
          opts={{
            align: "start",
            startIndex: 0,
            skipSnaps: true,
          }}
        >
          <CarouselContent>
            {movieTrendingData?.map((film) => {
              const simpleTitle = getSimpleTitle(film.title);

              return (
                <CarouselItem
                  key={film.id}
                  className="md:basis-1/5 xl:basis-1/6"
                >
                  <Link href={`/film/${film.id}/${simpleTitle}`}>
                    <div className="transition-all duration-150 hover:scale-105">
                      <Poster
                        title={film.title}
                        src={film.posterPath}
                        fetchSize="w342"
                        width={160}
                        height={240}
                        perspectiveEnabled={false}
                        classes="w-24 h-36 md:w-[120px] md:h-[180px] md-tablet:w-[140px] md-tablet:h-[210px] lg:w-[166px] lg:h-[249px] xl:w-44 xl:h-[264px]"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium">Your Next Obsession</h2>
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
                        classes="w-24 h-36 md:w-[120px] md:h-[180px] md-tablet:w-[140px] md-tablet:h-[210px] lg:w-[166px] lg:h-[249px] xl:w-44 xl:h-[264px]"
                      />
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
    </>
  );
}
