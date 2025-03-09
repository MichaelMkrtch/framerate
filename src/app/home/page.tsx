import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Header from "@/components/Header";
import HomeCarousel from "@/features/home/components/HomeCarousel";

// Turns off client-side caching of data on this page
// Default behavior is 30s cache which can result in out-of-date data
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-trending-day"],
    queryFn: () => fetch(`/api/trending?filter=all&timeWindow=day`),
    staleTime: 1000 * 60 * 10,
  });

  await queryClient.prefetchQuery({
    queryKey: ["movie-trending-week"],
    queryFn: () => fetch(`/api/trending?filter=movie&timeWindow=week`),
    staleTime: 10 * 60 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ["tv-trending-week"],
    queryFn: () => fetch(`/api/trending?filter=tv&timeWindow=week`),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      {/* HydrationBoundary is a Client Component, so hydration will happen there */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <main className="pb-14 2xl:pb-0">
          <HomeCarousel />
        </main>
      </HydrationBoundary>
    </>
  );
}
