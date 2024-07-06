"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import { pick } from "@/utils/pickProperties";

import type { StoredRating } from "@/app/film/[filmID]/[filmSlug]/page";
import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";

// import { createSeries, getSeries } from "@/lib/series";
// import { getAvgRating } from "@/lib/review";

type Series = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  seasons: number;
};

export default function SeriesDetailsPage() {
  const [series, setSeries] = useState<Series>();
  const [storedRating, setStoredRating] = useState<StoredRating>();

  const params = useParams<{ seriesID: string }>();

  const seriesID = parseInt(params.seriesID);

  const detailsList = useFetchDetails([{ mediaType: "tv", id: seriesID }]);
  const fetchedSeries = detailsList[0];

  useEffect(() => {
    (async () => {
      if (fetchedSeries && fetchedSeries.mediaType === "tv") {
        const tvSeries =
          fetchedSeries &&
          pick(
            fetchedSeries,
            "id",
            "title",
            "posterPath",
            "backdropPath",
            "releaseDate",
          );
      }
    })();
  }, [fetchedSeries]);

  return (
    series &&
    fetchedSeries && (
      <>
        <Backdrop title={series.title} backdropPath={series.backdropPath} />
        <div className="px-3.5 md:px-0">
          <DetailsSection
            media={fetchedSeries}
            storedRating={storedRating}
            title={series.title}
            posterPath={series.posterPath}
          />
        </div>
      </>
    )
  );
}
