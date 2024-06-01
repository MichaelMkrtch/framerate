import { useQuery } from "@tanstack/react-query";

import { type Film } from "@/types";

import { fetchCredits } from "@/utils/fetchCredits";

type CreditsProps = {
  film: Film;
};

export default function Credits({ film }: CreditsProps) {
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
      <h2 className="font-gothic pr-5 text-5xl tracking-wide">{film.title}</h2>
      <div className="font-jakarta mt-2.5 text-lg">
        <span className="pr-2">{film.release_date}</span>
        <span>Directed by {film.director}</span>
      </div>
    </>
  );
}
