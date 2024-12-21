"use client";

import type { Dispatch, SetStateAction } from "react";

import { useActionState, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner"
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
  const formRef = useRef<HTMLFormElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);

  const initialState: FormState = {
    status: "",
    message: "",
    errors: {},
  };

  const [formState, formAction] = useActionState(signup, initialState);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

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

  function handleClick() {
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

  useEffect(() => {
    const nameInput = nameWrapperRef.current?.children[0] as HTMLInputElement;
    if (nameInput) nameInput.focus();
  }, [page]);

  // Handle form success and failure with Sonner
  // if (!isPending) {
  //   if (formState.status === "success") {
  //     console.log(formState.message);
  //     formState.status = "";
  //   } else if (formState.status === "fail") {
  //     console.log(formState.message);
  //     formState.status = "";
  //   }
  // }

  function togglePasswordVisibility() {
    if (isVisible) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
  }

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction}>
        <div className={page === 1 ? "block" : "hidden"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div className="relative bg-white/[0.01] flex items-center ring-1 ring-white/10 rounded-full">
                    <Input
                      type="email"
                      placeholder="account email"
                      autoComplete="email"
                      autoFocus
                      className="auth-input ring-0 ring-transparent bg-transparent rounded-l-full rounded-r-none"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={handleClick}
                      className="pr-2.5 text-gray cursor-pointer hover:text-white transition-colors duration-200 flex flex-col items-center"
                    >
                      <CircleArrowRight size={32} strokeWidth={1.1} />
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage>{formState.errors?.email}</FormMessage>
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
                  <div ref={nameWrapperRef}>
                    <Input
                      id="name"
                      type="name"
                      placeholder="your name"
                      autoComplete="name"
                      autoFocus
                      className="auth-input"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your name.
                </FormDescription>
                <FormMessage>{formState.errors?.name}</FormMessage>
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
                <FormMessage>{formState.errors?.username}</FormMessage>
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
                  <div className="relative bg-white/[0.01] flex items-center ring-1 ring-white/10 rounded-full w-80">
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="your password"
                      autoComplete="new-password"
                      minLength={10}
                      maxLength={30}
                      className="auth-input ring-0 ring-transparent bg-transparent rounded-l-full rounded-r-none"
                      {...field}
                    />
                    <button
                      type="button"
                      className="pr-2.5 text-gray cursor-pointer hover:text-white transition-colors duration-200 flex flex-col items-center"
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
                  {Array.isArray(formState.errors?.password)
                    ? formState.errors?.password[0]
                    : formState.errors?.password}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
