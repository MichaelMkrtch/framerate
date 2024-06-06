import { type Review } from "@/types";

export default function parseData(storedReview: string | null): Review | null {
  try {
    if (storedReview) {
      const parsedReview: Review = JSON.parse(storedReview);
      return parsedReview;
    }
  } catch (error) {
    console.log("There was an error parsing stored film data.");
  }
  return null;
}
