import Trending from "@/components/home/Trending";
import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trending-week"],
    queryFn: () => fetchTrendingMovies("week"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-3 pt-20 md:px-0 md:pt-32">
        <h2 className="mb-3 text-lg font-medium">
          Everyone&apos;s Watching...
        </h2>
        <Trending />
      </main>
    </HydrationBoundary>
  );
}
