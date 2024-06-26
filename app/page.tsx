import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import SignUpForm from "@/components/home/SignUpForm";
import Trending from "@/components/home/Trending";
import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trending-week"],
    queryFn: () => fetchTrendingMovies("week"),
  });

  const quotes = [
    "There's no place like home",
    "We've been expecting you",
    "So, you've come at last",
    "Where we're going, we don't need roads",
    "This is an offer you can't refuse",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="px-3 pt-20 md:px-0 md:pt-32">
        {/* <h2 className="mb-3 text-lg font-medium">
          Everyone&apos;s Watching...
        </h2>
        <Trending /> */}

        <SignUpForm quote={randomQuote} />
      </main>
    </HydrationBoundary>
  );
}
