import { type Media, type StoredRating } from "@/types";

import Poster from "../ui/Poster";
import Credits from "./Credits";
import Details from "./Details";
import RatingCard from "./RatingCard";

export default function DetailsSection({
  media,
  title,
  posterPath,
}: {
  media: Media;
  title: string;
  posterPath: string | null;
}) {
  return (
    <>
      <div className="mt-11 grid w-full grid-cols-3 pt-[55%] md:mt-0 md:grid-rows-2 md:pt-[330px] md-tablet:grid-cols-7 lg:grid-cols-4 lg:grid-rows-none lg:pt-[400px] xl:pt-[470px]">
        <aside className="order-2 col-start-3 -mt-5 h-48 w-32 shrink-0 md:order-1 md:col-start-1 md:mr-6 md:mt-0 md:h-[300px] md:w-[200px] md-tablet:col-end-3 lg:col-end-2 lg:h-[345px] lg:w-[230px] xl:mr-16">
          <Poster
            title={title}
            src={posterPath ? posterPath : media.posterPath}
            fetchSize="w500"
            width={230}
            height={345}
            perspectiveEnabled={true}
            classes="w-full h-auto"
          />
        </aside>

        <div className="order-1 col-start-1 col-end-3 flex h-fit grow basis-2/3 flex-col items-baseline pr-3 md:order-2 md:col-start-2 md:col-end-5 md:pr-0 md-tablet:col-start-3 md-tablet:col-end-8 lg:col-start-2 lg:col-end-4 lg:ml-0">
          <Credits
            title={title}
            director={media.mediaType === "movie" && media.director}
            creator={media.mediaType === "tv" && media.creator}
            releaseDate={media.releaseDate}
          />
          <div className="hidden w-full md:order-3 md:mt-3 md:block md:pr-6 lg:mt-5 lg:w-11/12 lg:pr-0 xl:w-4/5">
            <Details tagline={media.tagline} overview={media.overview} />
          </div>
        </div>

        <div className="col-start-1 col-end-4 row-start-2 mt-2.5 w-full md:hidden">
          <Details tagline={media.tagline} overview={media.overview} />
        </div>

        <div className="order-4 col-start-1 col-end-4 mt-6 self-start md:col-end-2 md:row-start-2 md:mt-5 md:flex md:items-center md:justify-start md-tablet:col-end-auto lg:col-start-4 lg:row-start-1 lg:mt-0 lg:flex lg:basis-1/3 lg:justify-end lg:self-center">
          <RatingCard media={media} />
        </div>
      </div>

      <footer className="pb-28" />
    </>
  );
}
