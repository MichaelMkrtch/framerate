import type { Details } from "@/types/tmdb.types";

import { useActionState, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useReviewStore } from "@/store/details/review-store";
import { Form } from "@/components/ui/form";
import StarRating from "@/features/details/components/StarRating";
import { ratingSchema } from "@/features/details/schema/review";
import { review } from "@/features/details/server/actions/review-action";
import { getAvgRating } from "@/features/details/server/db/review";
import { authClient } from "@/lib/auth-client";

type FormState = {
  status: "success" | "error" | "";
  message: string;
};

export default function RatingForm({ media }: Record<"media", Details>) {
  const [rating, setRating] = useState<number | null>(null);
  const setStoredRating = useReviewStore((state) => state.setStoredRating);

  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = {
    status: "",
    message: "",
  };

  const [state, action] = useActionState(
    review.bind(null, media),
    initialState,
  );

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: "",
    },
  });

  async function handleRating() {
    const session = await authClient.getSession();

    if (!session.data) {
      toast.info("Please log in to save reviews");
      return;
    } else if (session.data?.user) {
      console.log("submitting");
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }

  useEffect(() => {
    (async () => {
      const average = await getAvgRating(media.mediaType, media.id);
      setStoredRating(average);
    })();

    if (state.status === "success") {
      toast.success(state.message);
      state.status = "";
    } else if (state.status === "error") {
      toast.error(state.message);
      state.status = "";
    }

    return () => setStoredRating(null);
  }, [state, media.id, media.mediaType, setStoredRating]);

  return (
    <Form {...form}>
      <form ref={formRef} action={action}>
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
