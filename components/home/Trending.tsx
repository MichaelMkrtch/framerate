"use client";

import useFetchTrending from "@/hooks/useFetchTrending";

export default function Trending() {
  const trendingData = useFetchTrending("week");

  if (trendingData) console.log(trendingData);

  return <div></div>;
}
