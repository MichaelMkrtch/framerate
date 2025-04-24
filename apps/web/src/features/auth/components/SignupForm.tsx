import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { signupSchema } from "@web/features/auth/schema/auth-forms";
import { blacklistChecks } from "@web/features/auth/server/auth-actions";
import { authClient } from "@web/lib/auth-client";

// import { createList } from "@/features/collections/server/db/list";
// import { generateSlug } from "@/lib/slug";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SignupFormProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function SignupForm({ page, setPage }: SignupFormProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
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
    } else {
      setPage(1);
    }
  }

  // Improves keyboard navigation by focusing relevant input on page changes
  useEffect(() => {
    if (page === 2) {
      form.setFocus("name");
    }

    return () => {
      form.setFocus("email");
    };
  }, [page, form.setFocus]);

  useEffect(() => {
    const emailErrors = form.formState.errors.email;

    if (page === 2 && emailErrors) {
      setPage(1);
    }
  }, [form.formState.errors.email]);

  // Checks input against filters before creating user in DB
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const result = blacklistChecks(values);

    if (result.status === "error") {
      toast.error(result.message);
      return;
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
              toast.loading("Creating account...", { id: "signup" });
            },
            onSuccess: async () => {
              toast.dismiss("signup");
              toast.success("Account created!");

              const { data: sessionData } = await authClient.getSession();

              // if (sessionData) {
              //   const slug = await generateSlug(
              //     "Watchlist",
              //     "list",
              //     sessionData.user.id,
              //   );
              //   await createList({
              //     userId: sessionData.user.id,
              //     name: "Watchlist",
              //     slug,
              //   });
              // }

              navigate({ to: "/home" });
            },
            onError: (ctx) => {
              toast.dismiss("signup");
              const errorCode = ctx.error.code;
              const errorMessage = ctx.error.message;

              switch (errorCode) {
                case "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER":
                  form.setError("username", { message: "Username is taken" });
                  toast.error(
                    "Username is already taken. Please try another one",
                    { duration: 6000 },
                  );
                  break;
                case "USER_ALREADY_EXISTS":
                  form.setError("email", {
                    message: "Account already exists",
                  });
                  toast.error(
                    "An account with this email already exists. Did you mean to log in?",
                    { duration: 6000 },
                  );
                  break;
                default:
                  toast.error(errorMessage, { duration: 6000 });
                  console.error(ctx.error);
              }
            },
          },
        );
      })();
    }
  }

  const groupedFields = [
    {
      fieldName: "name" as const,
      label: "Name",
      placeholder: "your name (public)",
      description:
        "Enter your name. It does not have to be your full name and will be public.",
    },
    {
      fieldName: "username" as const,
      label: "Username",
      placeholder: "your username (public)",
      description: "This is your public username.",
    },
  ];

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
                    className={`relative flex items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.email && "!ring-red-500"}`}
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
                      className="text-gray flex cursor-pointer flex-col items-center pr-2.5 duration-200 outline-none *:transition-colors hover:text-white"
                    >
                      <CircleArrowRight size={28} strokeWidth={1.1} />
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage className="mt-2 max-w-full font-medium text-wrap text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className={page === 2 ? "block space-y-6" : "hidden"}>
          {groupedFields.map((fieldItem) => {
            const { fieldName, label, placeholder, description } = fieldItem;

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof signupSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{label}</FormLabel>
                    <FormControl>
                      <Input
                        id={fieldName}
                        type="text"
                        placeholder={placeholder}
                        autoComplete={fieldName}
                        autoFocus={fieldName === "name"}
                        className={`auth-input ${form.formState.errors[fieldName] ? "ring-1 ring-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      {description}
                    </FormDescription>
                    <FormMessage className="mt-1 max-w-full font-medium text-wrap text-red-500" />
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
                    className={`relative flex w-80 items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.password && "!ring-red-500"}`}
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
                      className="text-gray flex cursor-pointer flex-col items-center pr-3 transition-colors duration-200 hover:text-white"
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
                  This is your password.
                </FormDescription>
                <FormMessage className="mt-2 max-w-full font-medium text-wrap text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {page === 2 && (
          <button
            type="submit"
            className="relative mt-8 w-full cursor-pointer rounded-full bg-transparent py-1.5 font-semibold ring-1 ring-white/10 transition-colors duration-150 hover:bg-white/10"
          >
            Create account
          </button>
        )}
      </form>
    </Form>
  );
}
