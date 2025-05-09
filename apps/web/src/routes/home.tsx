import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@web/components/DefaultCatchBoundary";
import Header from "@web/components/Header";
import HomeCarousel from "@web/features/home/components/HomeCarousel";
import { getTrending } from "@web/server/trending";

const createQueryOptions = (qc: QueryClient) =>
  queryOptions({
    queryKey: ["trending"],
    queryFn: async () => {
      await qc.prefetchQuery({
        queryKey: ["all-trending-day"],
        queryFn: () => getTrending({ filter: "all", timeWindow: "day" }),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
      });

      const movieData = getTrending({ filter: "movie", timeWindow: "week" });
      const tvData = getTrending({ filter: "tv", timeWindow: "week" });

      const [movie, tv] = await Promise.all([movieData, tvData]);

      return { movie, tv };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

export const Route = createFileRoute("/home")({
  loader: ({ context }) => {
    const trendingQueryOptions = createQueryOptions(context.queryClient);
    return context.queryClient.ensureQueryData(trendingQueryOptions);
  },
  errorComponent: DefaultCatchBoundary,
  component: Home,
});

function Home() {
  const { queryClient } = useRouteContext({ from: "/home" });

  const trendingQueryOptions = createQueryOptions(queryClient);

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
