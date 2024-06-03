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
      <div className="flex w-full pt-[470px]">
        <aside className="mr-16 h-[345px] w-[230px] shrink-0">
          <Poster
            title={film.title}
            src={film.poster_path}
            fetchSize="w500"
            width={230}
            height={345}
          />
        </aside>
        <div className="flex grow basis-2/3 flex-col items-baseline">
          <Credits film={film} />
          <div className="mt-5 w-4/5 flex-wrap">
            <Details film={film} />
          </div>
        </div>
        <div className="flex basis-1/3 items-center justify-end">
          <RatingCard />
        </div>
      </div>
    </>
  );
}