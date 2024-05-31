"use client";

import Backdrop from "@/components/ui/Backdrop";
import { useFilmStore } from "@/store/filmStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { fetchCredits } from "@/utils/fetchCredits";

export default function FilmDetailsPage() {
  const params = useParams<{ filmSlug: string }>();
  const film = useFilmStore((state) => state.film);

  const { data: creditData } = useQuery({
    queryKey: ["credit", film.id],
    queryFn: () => fetchCredits(film.id),
    staleTime: 1 * 60 * 1000,
    enabled: film.id >= 0,
  });

  return (
    <>
      <Backdrop />
      <div className="w-full text-center pt-[400px]">
        <h2 className="text-3xl tracking-wide">{film.title}</h2>
      </div>
    </>
  );
}
