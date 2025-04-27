import type { MediaDetails } from "@web/types/details";

import { useActionState, useEffect, useRef, useState } from "react";

import { Form } from "@web/components/ui/form";
import StarRating from "@web/features/details/components/StarRating";
import { ratingSchema } from "@web/features/details/schema/review";
// import { review } from "@web/features/details/server/actions/review-action";
// import { getAvgRating } from "@web/features/details/server/db/review";
import { authClient } from "@web/lib/auth-client";
import { useReviewStore } from "@web/store/details/review-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormState = {
  status: "success" | "error" | "";
  message: string;
};

export default function RatingForm({ media }: Record<"media", MediaDetails>) {
  const { setStoredRating } = useReviewStore();
  const [rating, setRating] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = {
    status: "",
    message: "",
  };

  // const [state, action] = useActionState(
  //   review.bind(null, media),
  //   initialState,
  // );

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
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     const average = await getAvgRating(media.mediaType, media.id);
  //     setStoredRating(average);
  //   })();

  //   if (state.status === "success") {
  //     toast.success(state.message);
  //     state.status = "";
  //   } else if (state.status === "error") {
  //     toast.error(state.message);
  //     state.status = "";
  //   }

  //   return () => setStoredRating({ avgRating: 0, reviewCount: 0 });
  // }, [state, media.id, media.mediaType, setStoredRating]);

  return (
    <Form {...form}>
      {/* <form ref={formRef} action={action}> */}
      <StarRating
        media={media}
        rating={rating}
        setRating={setRating}
        handleRating={handleRating}
      />
      {/* </form> */}
    </Form>
  );
}
