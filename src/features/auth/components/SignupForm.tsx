"use client";

import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/features/auth/schemas/auth-forms";
import { blacklistChecks } from "@/features/auth/server/actions/auth-actions";
import { authClient } from "@/lib/auth-client";

type SignupFormProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function SignupForm({ page, setPage }: SignupFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  // Email validation before page change necessary for UX
  // Otherwise, email input errors won't be visible to user
  async function handlePageChange() {
    if (page === 1) {
      const emailIsValid = await form.trigger("email");
      if (emailIsValid) {
        form.clearErrors("email");
        setPage(2);
        return;
      } else {
        form.setFocus("email");
      }
    }
    setPage(1);
  }

  // Focuses first input field on each form page after navigation
  useEffect(() => {
    if (page === 2) {
      form.setFocus("name");
    }

    return () => {
      form.setFocus("email");
    };
  }, [page, form]);

  // Checks input against filters before creating user in DB
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const result = await blacklistChecks(values);

    if (result.status === "error") {
      toast.error(result.message);
    }

    if (result.status === "success") {
      (async function signup() {
        await authClient.signUp.email(
          {
            email: values.email,
            name: values.name,
            username: values.username,
            password: values.password,
          },
          {
            onRequest: () => {
              toast.loading("Loading...", { id: "loading" });
            },
            onSuccess: () => {
              toast.dismiss("loading");
              toast.success("Account created!");
            },
            onError: (ctx) => {
              toast.dismiss("loading");
              if (ctx.error.code.includes("USERNAME_IS_ALREADY_TAKEN")) {
                toast.error("Username is taken. Please try another");
              } else {
                toast.error(ctx.error.message);
              }
            },
          },
        );
      })();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={page === 1 ? "block" : "hidden"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div
                    className={`relative flex items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.email && "ring-red-500"}`}
                  >
                    <Input
                      type="email"
                      placeholder="account email"
                      autoComplete="email"
                      autoFocus
                      className="auth-input rounded-l-full rounded-r-none bg-transparent ring-0 ring-transparent"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={handlePageChange}
                      className="flex cursor-pointer flex-col items-center pr-2.5 text-gray transition-colors duration-200 hover:text-white"
                    >
                      <CircleArrowRight size={28} strokeWidth={1.1} />
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        <div className={page === 2 ? "block" : "hidden"}>
          {/* Name and Username are similar enough to map together */}
          {["name", "username"].map((fieldName) => {
            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof signupSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{fieldName}</FormLabel>
                    <FormControl>
                      <Input
                        id={fieldName}
                        type="text"
                        placeholder={
                          fieldName === "name" ? "your name" : "your username"
                        }
                        autoComplete={
                          fieldName === "name" ? "name" : "username"
                        }
                        autoFocus={fieldName === "name" ? true : false}
                        className={`auth-input ${fieldName === "name" && form.formState.errors.name && "ring-1 ring-red-500"} ${fieldName === "username" && form.formState.errors.username && "ring-1 ring-red-500"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      {fieldName === "name"
                        ? "This is your name."
                        : "This is your username."}
                    </FormDescription>
                    <FormMessage className="tracking-wide" />
                  </FormItem>
                )}
              />
            );
          })}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div
                    className={`relative flex w-80 items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.password && "ring-1 ring-red-500"}`}
                  >
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="your password"
                      autoComplete="new-password"
                      className="auth-input rounded-l-full rounded-r-none bg-transparent ring-0 ring-transparent"
                      {...field}
                    />
                    <button
                      type="button"
                      className="flex cursor-pointer flex-col items-center pr-3 text-gray transition-colors duration-200 hover:text-white"
                      onClick={() =>
                        isVisible ? setIsVisible(false) : setIsVisible(true)
                      }
                    >
                      {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {page === 2 && (
          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-transparent py-1.5 ring-1 ring-white/10"
          >
            Create account
          </button>
        )}
      </form>
    </Form>
  );
}
