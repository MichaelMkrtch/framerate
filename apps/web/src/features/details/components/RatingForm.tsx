import type { MediaDetails } from "@web/types/details";

import { useEffect, useRef, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Form } from "@web/components/ui/form";
import StarRating from "@web/features/details/components/StarRating";
import { ratingSchema } from "@web/features/details/schema/review";
import { authClient } from "@web/lib/auth-client";
import { validateRating } from "@web/lib/validate-rating";
import { addReview, getAvgRating } from "@web/server/reviews";
import { useReviewStore } from "@web/store/details/review-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Review = {
  mediaType: "movie" | "tv";
  mediaId: number;
  rating: string;
};

async function submitReviewToServer(qc: QueryClient, values: Review) {
  const { mediaType, mediaId, rating } = values;

  const response = await addReview(mediaType, mediaId, rating, qc);

  if (!response) {
    toast.error("Failed to connect to server! Please try again later");
    console.error("Unexpected error while adding review:", response);
    return;
  }

  if (response.error) {
    toast.error("Failed to save review. Please try again later");
    return;
  }
}

export default function RatingForm({ media }: Record<"media", MediaDetails>) {
  const [rating, setRating] = useState<number | null>(null);

  const setStoredRating = useReviewStore.use.setStoredRating();

  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();
  const { data: authData } = authClient.useSession();

  const { data: averageData } = useQuery({
    queryKey: ["average-rating", media.mediaType, media.id],
    queryFn: async () => {
      console.log("running");
      const data = await getAvgRating(media.mediaType, media.id);
      console.log("recieved", data);
      return data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const reviewMutation = useMutation({
    mutationFn: ({ qc, values }: { qc: QueryClient; values: Review }) =>
      submitReviewToServer(qc, values),
    onSuccess: (data, variables) => {
      const {
        values: { mediaType, mediaId },
      } = variables;

      toast.success("Review updated");

      queryClient.invalidateQueries({
        queryKey: ["average-rating", mediaType, mediaId],
      });

      queryClient.invalidateQueries({
        queryKey: ["review", mediaType, mediaId],
      });

      queryClient.invalidateQueries({
        queryKey: ["library"],
      });
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to save review. Please try again later.",
      );
    },
  });

  const form = useForm<z.input<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: "",
    },
  });

  async function handleRating(rating: number) {
    if (!authData) {
      toast.info("Please log in to save reviews");
      return;
    } else if (authData.user.id) {
      const ratingObj = { rating: String(rating) };

      form.handleSubmit(() => onSubmit(ratingObj), onError)();
    }
  }

  useEffect(() => {
    if (averageData) {
      if (averageData.error) {
        toast.error(averageData.error.message);
        return;
      }

      console.log("setting rating to: ", averageData.data);
      setStoredRating(averageData.data);
    }
    return () => setStoredRating({ avgRating: null, reviewCount: 0 });
  }, [averageData, setStoredRating]);

  // only adds rating
  // delete is done in StarRating component
  async function onSubmit(values: z.infer<typeof ratingSchema>) {
    const parsed = ratingSchema.safeParse(values);

    if (!parsed.success) {
      return toast.error("Please provide a valid rating");
    }

    const error = validateRating(parsed.data.rating);

    if (error) {
      toast.error(error);
      return;
    }

    const { rating } = values;
    const { mediaType, id: mediaId } = media;

    reviewMutation.mutate({
      qc: queryClient,
      values: { mediaType, mediaId, rating },
    });
  }

  function onError(_errors: unknown) {
    toast.error("Please select a valid rating");
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <StarRating
          media={media}
          rating={rating}
          setRating={setRating}
          handleRating={handleRating}
        />
      </form>
    </Form>
  );
}
