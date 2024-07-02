"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { type Film } from "@/types";

import { Form } from "../ui/Form";
import StarRating from "../ui/StarRating";
import { movieRatingSchema } from "./reviewSchema";

import { review } from "@/actions/review-action";
import { validateRequest } from "@/lib/auth";

export default function RatingForm({
  film,
  rating,
  setRating,
}: {
  film: Film;
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
}) {
  const [formState, formAction] = useFormState(review.bind(null, film), {
    status: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof movieRatingSchema>>({
    resolver: zodResolver(movieRatingSchema),
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
          film={film}
          rating={rating}
          setRating={setRating}
          handleRating={handleRating}
        />
      </form>
    </Form>
  );
}
