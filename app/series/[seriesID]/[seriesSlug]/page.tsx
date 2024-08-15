"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetchDetails from "@/hooks/useFetchDetails";

import { pick } from "@/utils/pickProperties";

import type { StoredRating } from "@/app/film/[filmID]/[filmSlug]/page";
import DetailsSection from "@/components/details/DetailsSection";
import Backdrop from "@/components/ui/Backdrop";
import { createSeries, getSeries } from "@/lib/series";
import { getAvgSeriesRating } from "@/lib/seriesReview";

type Series = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
};

export default function SeriesDetailsPage() {
  const [series, setSeries] = useState<Series>();
  const [storedRating, setStoredRating] = useState<StoredRating>();

  const params = useParams<{ seriesID: string }>();

  const seriesId = parseInt(params.seriesID);

  const detailsList = useFetchDetails([{ mediaType: "tv", id: seriesId }]);
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

        tvSeries && (await createSeries(tvSeries));

        const result = await getSeries({ seriesId });
        if (result.length > 0) {
          setSeries(result[0]);
        }

        const average = await getAvgSeriesRating({ seriesId });
        if (average.length > 0) {
          setStoredRating(average[0]);
        }
      }
    })();
  }, [seriesId, fetchedSeries]);

  return (
    series &&
    fetchedSeries && (
      <>
        <Backdrop
          title={series.title}
          backdropPath={series.backdropPath}
          topPosition="top-1"
        />
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
