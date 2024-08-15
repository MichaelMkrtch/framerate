"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { HideIcon, ShowIcon } from "../ui/Icons";
import { signupFormSchema } from "./formSchema";

import { signup } from "@/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);

  const [formState, formAction] = useFormState(signup, {
    status: "",
    message: "",
  });
  const [page, setPage] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
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
    toast.success(formState.message);
    formState.status = "";
  } else if (formState.status === "fail") {
    toast.error(formState.message, { duration: 5000 });
    formState.status = "";
  }

  function toggleVisibility() {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...field}
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    {...field}
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    {...field}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex rounded bg-neutral-800 ring-1 ring-white/10">
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      minLength={10}
                      maxLength={30}
                      className="peer ring-0"
                      {...field}
                    />
                    <button
                      type="button"
                      className="relative right-2 float-right pl-3 pr-2.5 outline-none peer-placeholder-shown:hidden"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <HideIcon fill="#d4d4d8" classes="h-5 w-5" />
                      ) : (
                        <ShowIcon fill="#d4d4d8" classes="h-5 w-5" />
                      )}
                    </button>
                  </div>
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
              className="rounded bg-emerald-400 px-3 py-1.5 font-medium text-gray-850 outline-none ring-1 ring-emerald-300 transition-all duration-150 ease-out hover:shadow-[0_2px_20px_rgba(52,_211,_153,_0.7)]"
            >
              Let&apos;s go
            </button>
          )}
        </div>
      </form>
    </Form>
  );
}
