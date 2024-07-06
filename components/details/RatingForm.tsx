"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { type Media } from "@/types";

import { Form } from "../ui/Form";
import StarRating from "../ui/StarRating";
import { ratingSchema } from "./reviewSchema";

import { review } from "@/actions/review-action";
import { validateRequest } from "@/lib/auth";

export default function RatingForm({ media }: { media: Media }) {
  const [rating, setRating] = useState<number | null>(null);

  const [formState, formAction] = useFormState(review.bind(null, media), {
    status: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: "",
    },
  });

  async function handleRating() {
    const result = await validateRequest();

    if (!result.user) {
      toast.info("You must be logged in to save ratings");
      return;
    } else if (result.user) {
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }

  if (formState.status === "success") {
    toast.success(formState.message);
    formState.status = "";
  } else if (formState.status === "fail") {
    toast.error(formState.message);
    formState.status = "";
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(event);
        }}
        className="relative"
      >
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
