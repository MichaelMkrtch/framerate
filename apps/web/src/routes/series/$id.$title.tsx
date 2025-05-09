import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Backdrop from "@web/features/details/components/Backdrop";
import MediaDetails from "@web/features/details/components/MediaDetails";
import { getDetails } from "@web/server/details";

function createQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["tv-details", id],
    queryFn: async () => await getDetails("tv", id),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export const Route = createFileRoute("/series/$id/$title")({
  loader: ({ context, params }) => {
    const detailsQueryOptions = createQueryOptions(params.id);
    return context.queryClient.ensureQueryData(detailsQueryOptions);
  },
  component: SeriesPage,
});

export default function SeriesPage() {
  const { id } = Route.useParams();
  const detailsQueryOptions = createQueryOptions(id);

  const { data: fetchedSeries } = useSuspenseQuery(detailsQueryOptions);

  return (
    fetchedSeries && (
      <>
        <main className="relative pb-32">
          <Backdrop
            alt={`Still image from ${fetchedSeries.title}`}
            backdropPath={fetchedSeries.backdropPath ?? ""}
          />
          <MediaDetails
            media={fetchedSeries}
            title={fetchedSeries.title}
            posterPath={fetchedSeries.posterPath}
          />
        </main>
      </>
    )
  );
}
