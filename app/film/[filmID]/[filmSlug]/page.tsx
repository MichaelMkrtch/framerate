"use client";

import Backdrop from "@/components/ui/Backdrop";
import Poster from "@/components/ui/Poster";
import { useFilmStore } from "@/store/filmStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { fetchCredits } from "@/utils/fetchCredits";

export default function FilmDetailsPage() {
  const params = useParams<{ filmID: string }>();
  const filmList = useFilmStore((state) => state.films);

  const film = filmList.filter(
    (film) => film.id === parseInt(params.filmID),
  )[0];

  const { data: creditsData } = useQuery({
    queryKey: ["credit", film.id],
    queryFn: () => fetchCredits(film.id),
    staleTime: 1 * 60 * 1000,
    enabled: film.id >= 0,
  });

  if (creditsData) {
    film.cast = creditsData.cast;
    film.crew = creditsData.crew;
    const directorList = creditsData.directorList;

    if (directorList.length > 2) {
    } else if (directorList.length === 2) {
      film.director = directorList.map((director) => director.name).join(", ");
    } else if (directorList.length === 1) {
      film.director = directorList[0].name;
    } else {
      film.director = "Unknown";
    }
  }

  return (
    <>
      <Backdrop />
      <div className="flex w-full pt-[490px]">
        <aside className="mr-16 h-[345px] w-[230px]">
          <Poster
            title={film.title}
            src={film.poster_path}
            fetchSize="w500"
            width={230}
            height={345}
          />
        </aside>
        <div className="flex grow flex-col items-baseline">
          <h2 className="font-gothic pr-5 text-5xl tracking-wide">
            {film.title}
          </h2>
          <div className="font-jakarta mt-2.5 text-lg">
            <span className="pr-2">{film.release_date}</span>
            <span>Directed by {film.director}</span>
          </div>
        </div>
      </div>
    </>
  );
}
