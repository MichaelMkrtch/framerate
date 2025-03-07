"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useFetchDetails from "@/hooks/useFetchDetails";
import { Details } from "@/types/tmdb.types";

import Backdrop from "@/components/Backdrop";
import MediaDetails from "@/features/details/components/MediaDetails";
import { createSeries, getSeries } from "@/features/details/server/db/series";
import { pick } from "@/lib/utils";

type SeriesFromDB = Pick<
  Details<"tv">,
  "id" | "title" | "posterPath" | "backdropPath" | "releaseDate"
>;

export default function SeriesPage() {
  const [series, setSeries] = useState<SeriesFromDB>();

  const { series: tvShow } = useParams<{ series: [string, string] }>();
  const seriesId = parseInt(tvShow[0]);

  const details = useFetchDetails([{ mediaType: "tv", id: seriesId }])[0];
  const fetchedSeries = details;

  useEffect(() => {
    (async () => {
      const storedSeries = await getSeries(seriesId);
      if (storedSeries) setSeries(storedSeries);

      if (!storedSeries && fetchedSeries && fetchedSeries.mediaType === "tv") {
        const seriesToCreate = pick(
          fetchedSeries,
          "id",
          "title",
          "posterPath",
          "backdropPath",
          "releaseDate",
        );

        const storedSeries =
          seriesToCreate && (await createSeries(seriesToCreate));
        if (storedSeries) setSeries(storedSeries);
      }
    })();
  }, [seriesId, fetchedSeries]);

  return (
    fetchedSeries &&
    series && (
      <>
        <main className="relative pb-32">
          <Backdrop
            alt={`Still image from ${series.title}`}
            backdropPath={series.backdropPath ?? ""}
          />
          <MediaDetails
            media={fetchedSeries}
            title={fetchedSeries.title}
            posterPath={series.posterPath}
          />
        </main>
      </>
    )
  );
}
