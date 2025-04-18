import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/tanstack-react-start";
import { isClerkAPIResponseError } from "@clerk/tanstack-react-start/errors";
import { ClerkAPIError } from "@clerk/types";

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
import { signupSchema } from "@/features/auth/schema/auth-forms";
import { blacklistChecks } from "@/features/auth/server/auth-actions";

// import { createList } from "@/features/collections/server/db/list";
// import { generateSlug } from "@/lib/slug";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type SignupFormProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function SignupForm({ page, setPage }: SignupFormProps) {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const { signUp, isLoaded } = useSignUp();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
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
      form.setFocus("firstName");
    }

    return () => {
      form.setFocus("email");
    };
  }, [page, form.setFocus]);

  useEffect(() => {
    const emailErrors = form.formState.errors.email;

    if (page === 2 && emailErrors) {
      setPage(1);
      console.log(emailErrors);
    }
  }, [form.formState.errors.email]);

  // Checks input against filters before creating user in DB
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    if (!isLoaded) return null;

    // Reset states if form is resubmitted mid-signup
    setVerified(false);
    setErrors(undefined);
    setVerifying(true);

    const result = await blacklistChecks(values);

    if (result.status === "error") {
      toast.error(result.message);
      setVerifying(false);
      return;
    }

    if (result.status === "success") {
      if (!isLoaded && !signUp) {
        toast.error(
          "Our sign up service is currently unavailable. Please try again later or contact us.",
        );
        return null;
      }

      const { startEmailLinkFlow } = signUp.createEmailLinkFlow();

      toast.loading("Creating Account...", { id: "creating" });

      try {
        await signUp.create({
          emailAddress: values.email,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        // Dynamically set the host domain for dev and prod
        const protocol = window.location.protocol;
        const host = window.location.host;

        toast.dismiss("creating");

        toast.info(
          "Please check your email on this device and visit the link that was sent to you.",
          { duration: 6000 },
        );

        // Send signup email link
        const signUpAttempt = await startEmailLinkFlow({
          // URL to navigate to after the user visits the link in their email
          redirectUrl: `${protocol}//${host}/signup/verify`,
        });

        const verification = signUpAttempt.verifications.emailAddress;

        if (verification.verifiedFromTheSameClient()) {
          console.log("same client");
          setVerifying(false);
          setVerified(true);
        }
      } catch (err: any) {
        setVerifying(false);
        toast.dismiss("creating");

        if (isClerkAPIResponseError(err)) {
          setErrors(err.errors);

          for (const e of err.errors) {
            if (e.code === "form_identifier_exists") {
              if (e.meta?.paramName === "email_address") {
                form.setError("email", { message: e.longMessage });
                setPage(1);
                form.setFocus("email");
                toast.error(
                  "Email already exists. Please try again with another email or login to existing account.",
                  { duration: 6000 },
                );
                return;
              }

              if (e.meta?.paramName === "username") {
                form.setError("username", { message: e.longMessage });
                form.setFocus("username");
                toast.error(
                  "Username already exists. Please try again with a different username",
                  { duration: 6000 },
                );
                return;
              }
            } else if (e.code === "session_exists") {
              return toast.info(
                "You are currently signed in to a different account. Please sign out first to create another account.",
              );
            } else {
              toast.error(`An error occurred! ${e.longMessage}`);
              return;
            }
          }
        }
        toast.error("An unexpected error occurred!");
        console.error(JSON.stringify(err, null, 2));
      }
    }
  }

  const groupedFields = [
    {
      fieldName: "firstName" as const,
      label: "First Name",
      placeholder: "first name",
      description: "This is your public first name.",
    },
    {
      fieldName: "lastName" as const,
      label: "Last Name",
      placeholder: "last name",
      description: "This is your private last name.",
    },
    {
      fieldName: "username" as const,
      label: "Username",
      placeholder: "username",
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
                <FormMessage className="mt-2 font-medium text-red-500" />
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
                        autoFocus={fieldName === "firstName" ? true : false}
                        className={`auth-input ${form.formState.errors[fieldName] ? "ring-1 ring-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      {description}
                    </FormDescription>
                    <FormMessage className="font-medium tracking-wide text-red-500" />
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        {page === 2 && (
          <button
            type="submit"
            className="relative mt-8 w-full cursor-pointer rounded-full bg-transparent py-1.5 font-semibold ring-1 ring-white/10 before:absolute before:top-0 before:left-0 before:size-full before:rounded-full before:bg-white/35 before:opacity-0 before:hover:opacity-25"
          >
            Create account
          </button>
        )}
      </form>
    </Form>
  );
}
