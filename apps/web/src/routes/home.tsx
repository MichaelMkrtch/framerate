import { useEffect } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  queryOptions,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { DefaultCatchBoundary } from "@web/components/DefaultCatchBoundary";
import Header from "@web/components/Header";
import HomeCarousel from "@web/features/home/components/HomeCarousel";
import { fetchTrending } from "@web/server/fetchTrending";

const queryClient = new QueryClient();

const trendingQueryOptions = queryOptions({
  queryKey: ["trending"],
  queryFn: async () => {
    await queryClient.prefetchQuery({
      queryKey: ["all-trending-day"],
      queryFn: () => fetchTrending({ filter: "all", timeWindow: "day" }),
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    });

    return {
      movie: await fetchTrending({ filter: "movie", timeWindow: "week" }),
      tv: await fetchTrending({ filter: "tv", timeWindow: "week" }),
    };
  },
  staleTime: 10 * 60 * 1000,
  gcTime: 15 * 60 * 1000,
});

export const Route = createFileRoute("/home")({
  loader: () => queryClient.ensureQueryData(trendingQueryOptions),
  component: Home,
  errorComponent: ({ error, reset }) => {
    const queryErrorResetBoundary = useQueryErrorResetBoundary();

    useEffect(() => {
      // Reset the query error boundary
      queryErrorResetBoundary.reset();
    }, [queryErrorResetBoundary]);

    return <DefaultCatchBoundary error={error} reset={reset} />;
  },
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
