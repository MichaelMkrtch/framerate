"use client";

import useFetchTrending from "@/hooks/useFetchTrending";
import { toast } from "sonner";

export default function Test() {
  const { data: trendingData, error: trendingError } = useFetchTrending(
    "all",
    "week",
  );

  if (trendingData) {
    console.log("data", trendingData);
  }

  if (trendingError) {
    toast.error(trendingError.message, { duration: 5000 });
  }

  return <div>Hi</div>;
}
