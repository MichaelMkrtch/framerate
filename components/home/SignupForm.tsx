"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Toaster } from "../ui/Sonner";
import { formSchema } from "./formSchema";

import { signup } from "@/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import Input from "@/components/ui/Input";

export default function SignupForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [formState, formAction] = useFormState(signup, {
    status: "",
    message: "",
  });
  const [page, setPage] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  function handleClick() {
    if (page === 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  }

  if (formState.status === "success") {
    setOpen(false);
    toast.success(formState.message);
    formState.status = "";
  } else if (formState.status === "fail") {
    toast.error(formState.message, { duration: 5000 });
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
        className="mx-auto flex h-full w-full flex-col items-center justify-center"
      >
        <div className={page === 1 ? "w-full" : "hidden"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-6">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="john@email.com"
                    field={field}
                    autocomplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="John"
                    field={field}
                    autocomplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={page === 2 ? "w-full" : "hidden"}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="pb-6">
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="john123"
                    field={field}
                    autocomplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between pt-7">
          {page === 1 && (
            <button
              type="button"
              onClick={handleClick}
              className="ml-auto rounded px-3 py-1.5 font-medium outline-none transition-colors duration-150 hover:text-emerald-400"
            >
              Next
            </button>
          )}
          {page === 2 && (
            <button
              type="button"
              onClick={handleClick}
              className="self-center transition-colors duration-150 hover:text-zinc-500"
            >
              Back
            </button>
          )}
          {page === 2 && (
            <button
              type="submit"
              className="rounded bg-emerald-400 px-3 py-1.5 font-medium text-gray-850 outline-none ring-1 ring-emerald-300 transition-all duration-150 ease-in hover:shadow-[0_2px_20px_rgba(52,_211,_153,_0.7)]"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </Form>
  );
}
