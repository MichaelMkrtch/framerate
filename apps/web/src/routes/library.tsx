import {
  // queryOptions,
  useQuery,
  // useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";
import LibraryGrid from "@web/features/library/components/LibraryGrid";
// import { queryClient } from "@web/router";
import { getAllReviews } from "@web/server/reviews";

type LibraryFilters = {
  filter?: "film" | "series";
};

// function createQueryOptions() {
//   return queryOptions({
//     queryKey: ["library"],
//     queryFn: () => getAllReviews(),
//     staleTime: 2 * 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//   });
// }

export const Route = createFileRoute("/library")({
  validateSearch: (search: LibraryFilters) => {
    return { filter: search.filter };
  },
  // loader: () => {
  //   const libraryQueryOptions = createQueryOptions();
  //   return queryClient.ensureQueryData(libraryQueryOptions);
  // },
  component: Library,
});

function Library() {
  const { data: fetchedReviews } = useQuery({
    queryKey: ["library"],
    queryFn: () => getAllReviews(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // const detailsQueryOptions = createQueryOptions();

  // const { data: fetchedReviews } = useSuspenseQuery(detailsQueryOptions);

  return (
    <>
      <Header title="Library" />
      <main className="animate-fade-in">
        {fetchedReviews && fetchedReviews.data && (
          <LibraryGrid fetchedReviews={fetchedReviews.data} />
        )}
      </main>
    </>
  );
}
