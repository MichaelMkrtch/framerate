import { type Film } from "@/types";

import Poster from "../ui/Poster";
import Credits from "./Credits";
import Details from "./Details";
import RatingCard from "./RatingCard";

type DetailsSectionProps = {
  film: Film;
};

export default function DetailsSection({ film }: DetailsSectionProps) {
  return (
    <>
      {/* Tablet and Desktop layout */}
      <div className="hidden w-full pt-[470px] md:flex">
        <aside className="mr-16 shrink-0 md:h-[345px] md:w-[230px]">
          <Poster
            title={film.title}
            src={film.poster_path}
            fetchSize="w500"
            width={230}
            height={345}
            perspectiveEnabled={true}
            classes="w-full h-auto"
          />
        </aside>
        <div className="flex grow basis-2/3 flex-col items-baseline">
          <Credits
            title={film.title}
            director={film.director}
            releaseDate={film.release_date}
          />
          <div className="mt-5 w-4/5 flex-wrap">
            <Details tagline={film.tagline} overview={film.overview} />
          </div>
        </div>
        <div className="hidden basis-1/3 items-center justify-end lg:flex">
          <RatingCard film={film} />
        </div>
      </div>
      <div className="mt-5 hidden items-center justify-start md:flex lg:hidden">
        <RatingCard film={film} />
      </div>

      {/* Mobile Layout */}
      <div className="flex w-full pt-56 md:hidden">
        <div className="flex grow basis-2/3 flex-col items-baseline pr-3">
          <Credits
            title={film.title}
            director={film.director}
            releaseDate={film.release_date}
          />
        </div>
        <aside className="-mt-5 h-[168px] w-28 shrink-0">
          <Poster
            title={film.title}
            src={film.poster_path}
            fetchSize="w500"
            width={230}
            height={345}
            perspectiveEnabled={true}
            classes="w-full h-auto"
          />
        </aside>
        <div className="hidden basis-1/3 items-center justify-end lg:flex">
          <RatingCard film={film} />
        </div>
      </div>
      <div className="mt-2.5 w-full">
        <Details tagline={film.tagline} overview={film.overview} />
      </div>
    </>
  );
}
