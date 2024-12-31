import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Header from "@/components/Header";
import HomeCarousel from "@/features/home/components/HomeCarousel";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trending"],
    queryFn: () => fetch(`/api/trending?filter=all&timeWindow=week`),
  });

  return (
    <>
      {/* HydrationBoundary is a Client Component, so hydration will happen there */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <HomeCarousel />
      </HydrationBoundary>
    </>
  );
}
