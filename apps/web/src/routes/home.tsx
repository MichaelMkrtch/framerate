import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@web/components/DefaultCatchBoundary";
import Header from "@web/components/Header";
import HomeCarousel from "@web/features/home/components/HomeCarousel";
import { queryClient } from "@web/router";
import { getTrending } from "@web/server/trending";

const trendingQueryOptions = queryOptions({
  queryKey: ["trending"],
  queryFn: async () => {
    await queryClient.prefetchQuery({
      queryKey: ["all-trending-day"],
      queryFn: () => getTrending({ filter: "all", timeWindow: "day" }),
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    });

    return {
      movie: await getTrending({ filter: "movie", timeWindow: "week" }),
      tv: await getTrending({ filter: "tv", timeWindow: "week" }),
    };
  },
  staleTime: 10 * 60 * 1000,
  gcTime: 15 * 60 * 1000,
});

export const Route = createFileRoute("/home")({
  loader: () => queryClient.ensureQueryData(trendingQueryOptions),
  errorComponent: DefaultCatchBoundary,
  component: Home,
});

function Home() {
  const {
    data: { movie, tv },
  } = useSuspenseQuery(trendingQueryOptions);

  return (
    <>
      {/* HydrationBoundary is a Client Component, so hydration will happen there */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <main className="animate-fade-in pb-14">
          <HomeCarousel trendingMovies={movie} trendingTv={tv} />
        </main>
      </HydrationBoundary>
    </>
  );
}
