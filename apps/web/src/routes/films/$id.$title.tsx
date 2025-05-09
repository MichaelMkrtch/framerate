import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Backdrop from "@web/features/details/components/Backdrop";
import MediaDetails from "@web/features/details/components/MediaDetails";
import { getDetails } from "@web/server/details";

function createQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["movie-details", id],
    queryFn: () => getDetails("movie", id),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export const Route = createFileRoute("/films/$id/$title")({
  loader: ({ context, params }) => {
    const detailsQueryOptions = createQueryOptions(params.id);
    return context.queryClient.ensureQueryData(detailsQueryOptions);
  },
  component: FilmPage,
});

export default function FilmPage() {
  const { id } = Route.useParams();
  const detailsQueryOptions = createQueryOptions(id);

  const { data: fetchedMovie } = useSuspenseQuery(detailsQueryOptions);

  return (
    fetchedMovie && (
      <>
        <main className="relative pb-32">
          <Backdrop
            alt={`Still image from ${fetchedMovie.title}`}
            backdropPath={fetchedMovie.backdropPath ?? ""}
          />
          <MediaDetails
            media={fetchedMovie}
            title={fetchedMovie.title}
            posterPath={fetchedMovie.posterPath}
          />
        </main>
      </>
    )
  );
}
