import { useQuery } from "@tanstack/react-query";

import { type Film } from "@/types";

import { fetchDetails } from "@/utils/fetchDetails";

type DetailsProps = {
  film: Film;
};

export default function Details({ film }: DetailsProps) {
  const { data: detailsData } = useQuery({
    queryKey: ["details", film.id],
    queryFn: () => fetchDetails(film.id),
    staleTime: 1 * 60 * 1000,
    enabled: film.id > 0,
  });

  return (
    detailsData && (
      <>
        <h3 className="uppercase font-light text-sm tracking-wide">{detailsData.tagline}</h3>
        <p className="mt-2.5 leading-relaxed">{detailsData.overview}</p>
      </>
    )
  );
}
