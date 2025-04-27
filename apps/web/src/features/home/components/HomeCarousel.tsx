import type { Trending } from "@web/types/tmdb-types";

import { useState } from "react";
import { Link } from "@tanstack/react-router";

import Poster from "@web/components/Poster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@web/components/ui/carousel";
import { getSimpleTitle } from "@web/utils/strings";

type HomeComponentProps = {
  trendingMovies: Trending<"movie">[];
  trendingTv: Trending<"tv">[];
};

export default function HomeCarousel({
  trendingMovies,
  trendingTv,
}: HomeComponentProps) {
  const [movieData] = useState(trendingMovies);
  const [tvData] = useState(trendingTv);

  const groupedData = [
    {
      type: "movie",
      title: "Movies Making Waves",
      link: "/films/$id/$title",
      data: movieData,
    },
    {
      type: "tv",
      title: "Series Sensations",
      link: "/series/$id/$title",
      data: tvData,
    },
  ];

  return (
    <div className="animate-fade-in">
      {groupedData.map((group) => {
        const { data } = group;

        return (
          <section
            key={group.title}
            className="carousel-container group/trending"
          >
            <h2 className="mb-3 ml-2 text-lg font-medium">{group.title}</h2>
            <Carousel
              opts={{
                align: "start",
                startIndex: 0,
                skipSnaps: true,
              }}
            >
              <CarouselContent>
                {data?.map((media, index) => {
                  const simpleTitle = getSimpleTitle(media.title);
                  const loadingStrategy = index < 6 ? "eager" : "lazy";

                  return (
                    <CarouselItem
                      key={media.id}
                      className="md:basis-1/5 xl:basis-1/6"
                    >
                      <Link
                        to={group.link}
                        params={{
                          id: String(media.id),
                          title: simpleTitle,
                        }}
                      >
                        <Poster
                          title={media.title}
                          src={media.posterPath}
                          fetchSize="w342"
                          width={160}
                          height={240}
                          perspectiveEnabled={false}
                          scale={105}
                          loading={loadingStrategy}
                          classes="carousel-item w-[170px] h-[255px]"
                        />
                      </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
              <CarouselNext className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
            </Carousel>
          </section>
        );
      })}
    </div>
  );
}
