"use client";

import type { Dispatch, SetStateAction } from "react";

import { useActionState, useEffect, useState } from "react";

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
import { signup } from "@/features/auth/server/actions/auth-actions";

type SignupFormProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

type FormState = {
  status: "success" | "error" | "";
  message: string;
  errors: {
    email?: string[];
    name?: string[];
    username?: string[];
    password?: string[];
  };
};

export default function SignupForm({ page, setPage }: SignupFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  const initialState: FormState = {
    status: "",
    message: "",
    errors: {},
  };

  const [formState, formAction, pending] = useActionState(signup, initialState);

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

  // Checks if email is valid before changing page
  function handlePageChange() {
    if (page === 1) {
      const emailIsValid = validateEmail();
      if (emailIsValid) {
        form.clearErrors("email");
        setPage(2);
        return;
      }
    }
    setPage(1);
  }

  function validateEmail() {
    const emailSchema = z.object({ email: signupSchema.shape["email"] });
    const result = emailSchema.safeParse({ email: form.watch("email") });

    if (!result.success) {
      form.setError(
        "email",
        {
          type: "onBlur",
          message: result.error.errors[0].message,
        },
        { shouldFocus: true },
      );
      return false;
    }

    return true;
  }

  // Focuses first input field on form pages after navigation
  useEffect(() => {
    if (page === 2) {
      form.setFocus("name");
    }

    return () => {
      form.setFocus("email");
    };
  }, [page, form]);

  function togglePasswordVisibility() {
    if (isVisible) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
  }

  // Resolves/Rejects a promise after signup action returns to trigger dynamic toast
  useEffect(() => {
    if (formState.status !== "") {
      const submitPromise = () =>
        new Promise((resolve, reject) => {
          if (formState.status === "success") {
            resolve(formState.message);
          }
          if (formState.status === "error") {
            reject(formState.message);
          }
        });

      toast.promise(submitPromise, {
        loading: "Loading...",
        success: (message) => {
          return `${message}`;
        },
        error: (message) => {
          return message;
        },
      });
    }

    // Prevents extra toast with previous message when resubmitting form
    return () => {
      formState.status = "";
    };
  }, [formState, pending]);

  return (
    <Form {...form}>
      <form action={formAction}>
        <div className={page === 1 ? "block" : "hidden"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div className="relative flex items-center rounded-full bg-white/[0.01] ring-1 ring-white/10">
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
                <FormMessage className="absolute">
                  {formState && formState.errors?.email}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className={page === 2 ? "block" : "hidden"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="name"
                    placeholder="your name"
                    autoComplete="name"
                    autoFocus
                    className="auth-input"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your name.
                </FormDescription>
                <FormMessage className="text-wrap">
                  {formState &&
                    (Array.isArray(formState.errors?.name)
                      ? formState.errors?.name[0]
                      : formState.errors?.name)}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <Input
                    type="username"
                    placeholder="your username"
                    autoComplete="username"
                    className="auth-input"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public username.
                </FormDescription>
                <FormMessage>
                  {formState &&
                    (Array.isArray(formState.errors?.username)
                      ? formState.errors?.username[0]
                      : formState.errors?.username)}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div className="relative flex w-80 items-center rounded-full bg-white/[0.01] ring-1 ring-white/10">
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
                      onClick={togglePasswordVisibility}
                    >
                      {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage>
                  {formState &&
                    (Array.isArray(formState.errors?.password)
                      ? formState.errors?.password[0]
                      : formState.errors?.password)}
                </FormMessage>
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
