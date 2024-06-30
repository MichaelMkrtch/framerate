"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { HideIcon, ShowIcon } from "../ui/Icons";
import { Input } from "../ui/Input";
import { loginFormSchema } from "./formSchema";

import { login } from "@/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const [formState, formAction] = useFormState(login, {
    status: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-6">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
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
                      autoComplete="current-password"
                      className="ring-0"
                      {...field}
                    />
                    <button
                      type="button"
                      className="relative right-2 float-right pl-3 pr-2.5 outline-none"
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
        <div className="mt-7 flex w-full items-center justify-end">
          <button
            type="submit"
            className="rounded bg-cyan-350 px-3 py-1.5 font-medium text-gray-850 outline-none ring-1 ring-cyan-300 transition-all duration-150 ease-in hover:shadow-[0_2px_20px_rgba(0,209,224,_0.7)]"
          >
            Login
          </button>
        </div>
      </form>
    </Form>
  );
}
