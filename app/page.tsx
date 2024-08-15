import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import Home from "@/components/home/Home";
import LandingPage from "@/components/home/LandingPage";
import { validateRequest } from "@/lib/auth";
import { fetchTrending } from "@/services/fetchTrending";

export default async function HomePage() {
  const result = await validateRequest();

  const pageContent = result.user ? <Home /> : <LandingPage />;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-trending-week"],
    queryFn: () => fetchTrending("movie", "week"),
    staleTime: 10 * 60 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ["tv-trending-week"],
    queryFn: () => fetchTrending("tv", "week"),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-[calc(90dvh)] px-3 pt-20 md:px-0 md:pt-32">
        {pageContent}
      </main>
    </HydrationBoundary>
  );
}
