import { client } from "./client-instance";

const reviewRoute = client.api.v1.reviews;

export async function getReview(mediaType: "movie" | "tv", mediaId: number) {
  const { data, error } = await reviewRoute({ mediaType })({ mediaId }).get();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function getAvgRating(mediaType: "movie" | "tv", mediaId: number) {
  const { data, error } = await reviewRoute({ mediaType })({
    mediaId,
  }).average.get();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function addReview(
  mediaType: "movie" | "tv",
  mediaId: number,
  rating: string,
) {
  const { data, error } = await reviewRoute({ mediaType })({ mediaId }).post({
    rating,
  });

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}

export async function deleteReview(mediaType: "movie" | "tv", mediaId: number) {
  const { data, error } = await reviewRoute({ mediaType })({
    mediaId,
  }).delete();

  if (error) {
    throw new Error(`${error.status} - ${error.value.message}`);
  }

  return data;
}
