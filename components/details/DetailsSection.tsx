import { type Film } from "@/types";

import Poster from "../ui/Poster";
import Credits from "./Credits";
import Details from "./Details";

type DetailsSectionProps = {
  film: Film;
};

export default function DetailsSection({ film }: DetailsSectionProps) {
  return (
    <>
      <div className="flex w-full pt-[490px]">
        <aside className="mr-16 h-[345px] w-[230px] shrink-0">
          <Poster
            title={film.title}
            src={film.poster_path}
            fetchSize="w500"
            width={230}
            height={345}
          />
        </aside>
        <div className="flex grow flex-col items-baseline">
          <Credits film={film} />
          <div className="w-3/5 flex-wrap mt-5">
            <Details film={film} />
          </div>
        </div>
        {/* <div>
          <h3 className="flex h-full items-center justify-center">Rating</h3>
        </div> */}
      </div>
    </>
  );
}
