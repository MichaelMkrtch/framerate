import type { Trending } from "@web/types/tmdb-types";

import { useEffect, useState } from "react";
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
    <div className="animate-in">
      {groupedData.map((group) => {
        const { data } = group;

        return (
          <section
            key={group.title}
            className="carousel-container group/trending"
          >
            <h2 className="mb-2 ml-2 text-lg font-medium">{group.title}</h2>
            <Carousel
              opts={{
                align: "start",
                startIndex: 0,
                skipSnaps: true,
              }}
            >
              <CarouselContent>
                {data?.map((media) => {
                  const simpleTitle = getSimpleTitle(media.title);

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
                          classes="animate-fade-in carousel-item w-[170px] h-[255px]"
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

  // return (
  //   <div className="animate-fade-in">
  //     <section className="carousel-container group/trending">
  //       <h2 className="mb-2 ml-2 text-lg font-medium">Movies Making Waves</h2>
  //       <Carousel
  //         opts={{
  //           align: "start",
  //           startIndex: 0,
  //           skipSnaps: true,
  //         }}
  //       >
  //         <CarouselContent>
  //           {movieData?.map((movie) => {
  //             const simpleTitle = getSimpleTitle(movie.title);

  //             return (
  //               <CarouselItem
  //                 key={movie.id}
  //                 className="md:basis-1/5 xl:basis-1/6"
  //               >
  //                 <Link
  //                   to="/films/$filmId/$title"
  //                   params={{ filmId: String(movie.id), title: simpleTitle }}
  //                 >
  //                   <Poster
  //                     title={movie.title}
  //                     src={movie.posterPath}
  //                     fetchSize="w342"
  //                     width={160}
  //                     height={240}
  //                     perspectiveEnabled={false}
  //                     scale={105}
  //                     classes="animate-fade-in carousel-item w-[170px] h-[255px]"
  //                   />
  //                 </Link>
  //               </CarouselItem>
  //             );
  //           })}
  //         </CarouselContent>
  //         <CarouselPrevious className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
  //         <CarouselNext className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
  //       </Carousel>
  //     </section>

  //     <section className="carousel-container group/trending">
  //       <h2 className="mb-3 ml-2 text-lg font-medium">Series Sensations</h2>
  //       <Carousel
  //         opts={{
  //           align: "start",
  //           startIndex: 0,
  //           skipSnaps: true,
  //         }}
  //       >
  //         <CarouselContent>
  //           {tvData?.map((series) => {
  //             const simpleTitle = getSimpleTitle(series.title);

  //             return (
  //               <CarouselItem
  //                 key={series.id}
  //                 className="md:basis-1/5 xl:basis-1/6"
  //               >
  //                 <Link
  //                   to="/series/$seriesId/$title"
  //                   params={{ seriesId: String(series.id), title: simpleTitle }}
  //                 >
  //                   <Poster
  //                     title={series.title}
  //                     src={series.posterPath}
  //                     fetchSize="w342"
  //                     width={160}
  //                     height={240}
  //                     perspectiveEnabled={false}
  //                     scale={105}
  //                     classes="carousel-item w-[170px] h-[255px]"
  //                   />
  //                 </Link>
  //               </CarouselItem>
  //             );
  //           })}
  //         </CarouselContent>
  //         <CarouselPrevious className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
  //         <CarouselNext className="group/trending animate-fade-in hidden md:group-hover/trending:flex" />
  //       </Carousel>
  //     </section>
  //   </div>
  // );
}
