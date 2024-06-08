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
      opts={{ align: "start", loop: true, skipSnaps: true }}
      className="h-[264px]"
    >
      <CarouselContent className="">
        {trendingData?.map((film) => {
          const simpleTitle = getSimpleTitle(film.title);

          return (
            <CarouselItem
              key={film.id}
              className="md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Link href={`/film/${film.id}/${simpleTitle}`}>
                <div className="transition-all duration-150 hover:scale-105">
                  <Poster
                    title={film.title}
                    src={film.poster_path}
                    fetchSize="w342"
                    width={160}
                    height={240}
                    perspectiveEnabled={false}
                    classes="h-[264px] w-44"
                  />
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
