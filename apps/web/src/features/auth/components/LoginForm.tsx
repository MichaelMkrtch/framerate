import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

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
import { loginSchema } from "@/features/auth/schema/auth-forms";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function LoginForm() {
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate({ from: "/login" });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    if (!isLoaded) return null;

    // Reset states if form is resubmitted mid-login
    setVerified(false);
    setErrors(undefined);

    if (!isLoaded && !signIn) {
      toast.error(
        "Our login service is currently unavailable. Please try again later or contact us.",
      );
      return null;
    }

    const { startEmailLinkFlow } = signIn.createEmailLinkFlow();

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: values.email,
      });

      setVerifying(true);

      // Filter for email_link
      const isEmailLinkFactor = (
        factor: SignInFirstFactor,
      ): factor is EmailLinkFactor => {
        return factor.strategy === "email_link";
      };

      const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor);

      if (!emailLinkFactor) {
        form.setError("email", { message: "Incorrect email" });
        form.setFocus("email");
        toast.error("Email link login is not available for this account", {
          duration: 5000,
        });
        return;
      }

      const { emailAddressId } = emailLinkFactor;

      // Dynamically set the host domain for dev and prod
      const protocol = window.location.protocol;
      const host = window.location.host;

      toast.info(
        "Please check your email on this device and visit the link that was sent to you.",
        { duration: 6000 },
      );

      // Send login email link
      const signInAttempt = await startEmailLinkFlow({
        emailAddressId,
        redirectUrl: `${protocol}//${host}/login/verify`,
      });

      const verification = signInAttempt.firstFactorVerification;

      // Handle if verification expired
      if (verification.status === "expired") {
        form.setError("email", { message: "Email link expired" });
        form.setFocus("email");
        toast.error("The email link has expired. Please try again", {
          duration: 5000,
        });
      }

      // Handle if user visited the link and completed login from /login/verify
      if (verification.verifiedFromTheSameClient()) {
        console.log("same client");
        setVerifying(false);
        setVerified(true);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);

        for (const e of err.errors) {
          if (
            e.code === "session_exists" ||
            e.code === "identifier_already_signed_in"
          ) {
            toast.info("You are already signed in. Redirecting to Home.");
            return navigate({ to: "/home" });
          } else if (e.code === "form_identifier_not_found") {
            toast.info("Account not found. Redireting to Sign Up.", {
              duration: 6000,
            });
            return navigate({ to: "/signup" });
          } else if (e.code === "user_locked") {
            let currentDate = new Date();

            currentDate.setSeconds(
              // @ts-ignore
              currentDate.getSeconds() + e.meta?.lockout_expires_in_seconds,
            );

            const lockoutExpiresAt = currentDate.toLocaleString();

            toast.error(
              `This account has been locked. You will be able to try again at ${lockoutExpiresAt}`,
              { duration: 8000 },
            );
            return;
          } else {
            console.log("error", e);
            form.setError("email", { message: e.longMessage });
            form.setFocus("email");
            toast.error(`An error occurred! ${e.longMessage}`);
            return;
          }
        }
      }
      toast.error("An unexpected error occurred!");
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <div
                  className={`relative flex w-[360px] items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.email && "!ring-red-500"}`}
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
                    type="submit"
                    className="text-gray flex cursor-pointer flex-col items-center pr-2.5 transition-colors duration-200 hover:text-white"
                  >
                    <CircleArrowRight size={28} strokeWidth={1.1} />
                  </button>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is the email you used to create your account.
              </FormDescription>
              <FormMessage className="mt-2 max-w-1/2 font-medium text-wrap text-red-500" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
