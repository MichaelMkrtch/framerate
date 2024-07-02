import { type Film } from "@/types";

import Poster from "../ui/Poster";
import Credits from "./Credits";
import Details from "./Details";
import RatingCard from "./RatingCard";

export default function DetailsSection({
  film,
  posterPath,
}: {
  film: Film;
  posterPath: string | null;
}) {
  return (
    <>
      {/* Tablet and Desktop layout */}
      <div className="hidden w-full md:flex md:pt-[330px] lg:pt-[400px] xl:pt-[470px]">
        <aside className="mr-6 shrink-0 md:h-[300px] md:w-[200px] lg:h-[345px] lg:w-[230px] xl:mr-16">
          <Poster
            title={film.title}
            src={posterPath ? posterPath : film.posterPath}
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
            releaseDate={film.releaseDate}
          />
          <div className="mt-3 w-full pr-6 lg:mt-5 lg:w-11/12 lg:pr-0 xl:w-4/5">
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
      <div className="md:hidden">
        <div className="flex w-full pt-[55%] md:hidden">
          <div className="flex grow basis-2/3 flex-col items-baseline pr-3">
            <Credits
              title={film.title}
              director={film.director}
              releaseDate={film.releaseDate}
            />
          </div>
          <aside className="-mt-5 h-48 w-32 shrink-0">
            <Poster
              title={film.title}
              src={posterPath ? posterPath : film.posterPath}
              fetchSize="w500"
              width={230}
              height={345}
              perspectiveEnabled={true}
              classes="w-full h-auto"
            />
          </aside>
        </div>
        <div className="mt-2.5 w-full md:hidden">
          <Details tagline={film.tagline} overview={film.overview} />
        </div>
        <div className="mt-6">
          <RatingCard film={film} />
        </div>
      </div>
    </>
  );
}
