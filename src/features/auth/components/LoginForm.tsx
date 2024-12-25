"use client";

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
import { loginSchema } from "../schemas/auth-forms";

export default function LoginForm() {
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleEmailValidation() {
    if (!isEmailValidated) {
      const emailIsValid = await form.trigger("email");
      if (emailIsValid) {
        form.clearErrors("email");
        setIsEmailValidated(true);
        return;
      } else {
        form.setFocus("email");
      }
    }
  }

  // Improves keyboard navigation by focusing relevant input
  // after email validation
  useEffect(() => {
    if (isEmailValidated) {
      form.setFocus("password");
    }

    return () => {
      form.setFocus("email");
    };
  }, [isEmailValidated, form]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <div
                  className={`relative flex w-[360px] items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.email && "ring-red-500"}`}
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
                    onClick={handleEmailValidation}
                    className={`flex cursor-pointer flex-col items-center pr-2.5 text-gray transition-colors duration-200 hover:text-white ${isEmailValidated ? "hidden" : "block"}`}
                  >
                    <CircleArrowRight size={28} strokeWidth={1.1} />
                  </button>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is the email you used to create your account.
              </FormDescription>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <div className={isEmailValidated ? "absolute mt-1" : "hidden"}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div
                    className={`relative flex items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.password && "ring-1 ring-red-500"}`}
                  >
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="your password"
                      autoComplete="current-password"
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
                      {isVisible ? (
                        <Eye size={28} strokeWidth={1.1} />
                      ) : (
                        <EyeOff size={28} strokeWidth={1.1} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is the password to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEmailValidated && (
          <button
            type="submit"
            className="absolute mt-24 w-full rounded-full bg-transparent py-1.5 font-semibold ring-1 ring-white/10 before:absolute before:left-0 before:top-0 before:size-full before:rounded-full before:bg-white/35 before:opacity-0 before:hover:opacity-25"
          >
            Login
          </button>
        )}
      </form>
    </Form>
  );
}
