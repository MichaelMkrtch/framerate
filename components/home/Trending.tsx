"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Link from "next/link";

import useFetchTrending from "@/hooks/useFetchTrending";

import getSimpleTitle from "@/utils/getSimpleTitle";

import Poster from "../ui/Poster";

export default function Trending() {
  const data = useFetchTrending("week");
  let trendingData;

  if (data) {
    trendingData = data.slice(0, 12);
  }

  return (
    <Carousel
      opts={{
        align: "start",
        startIndex: 0,
        loop: true,
        skipSnaps: true,
      }}
    >
      <CarouselContent>
        {trendingData?.map((film) => {
          const simpleTitle = getSimpleTitle(film.title);

          return (
            <CarouselItem key={film.id} className="md:basis-1/5 xl:basis-1/6">
              <Link href={`/film/${film.id}/${simpleTitle}`}>
                <div className="transition-all duration-150 hover:scale-105">
                  <Poster
                    title={film.title}
                    src={film.poster_path}
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
      <CarouselPrevious className="hidden md:block" />
      <CarouselNext className="hidden md:block" />
    </Carousel>
  );
}
