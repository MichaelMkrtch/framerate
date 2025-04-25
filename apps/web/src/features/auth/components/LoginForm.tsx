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
import { loginSchema } from "@web/features/auth/schema/auth-forms";
import { authClient } from "@web/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function LoginForm() {
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          toast.loading("Signing in...", { id: "sign in" });
        },
        onSuccess: () => {
          authClient.revokeOtherSessions();
          toast.dismiss("sign in");
          toast.success("Signed in");
          navigate({ to: "/home" });
        },
        onError: (ctx) => {
          toast.dismiss("sign in");
          const errorCode = ctx.error.code;
          const errorMessage = ctx.error.message;

          switch (errorCode) {
            case "INVALID_EMAIL_OR_PASSWORD":
              toast.error("Invalid email or password");
              break;
            default:
              toast.error(`An error occurred! ${errorMessage}`, {
                duration: 6000,
              });
              console.error(ctx.error);
          }
        },
      },
    );
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
                    onClick={handleEmailValidation}
                    className={`text-gray flex cursor-pointer flex-col items-center pr-2.5 transition-colors duration-200 hover:text-white ${isEmailValidated ? "hidden" : "block"}`}
                  >
                    <CircleArrowRight size={28} strokeWidth={1.1} />
                  </button>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is the email you used to create your account.
              </FormDescription>
              <FormMessage className="mt-1 max-w-full font-medium text-wrap text-red-500" />
            </FormItem>
          )}
        />

        <div className={isEmailValidated ? "mt-6" : "hidden"}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div
                    className={`relative flex items-center rounded-full bg-white/[0.01] ring-1 ring-white/10 ${form.formState.errors.password && "!ring-red-500"}`}
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
                      onClick={() =>
                        isVisible ? setIsVisible(false) : setIsVisible(true)
                      }
                      className="text-gray flex cursor-pointer flex-col items-center pr-3 transition-colors duration-200 hover:text-white"
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
                <FormMessage className="mt- max-w-full font-medium text-wrap text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {isEmailValidated && (
          <button
            type="submit"
            className="absolute mt-10 w-full rounded-full bg-transparent py-1.5 font-semibold ring-1 ring-white/10 transition-colors duration-150 hover:bg-white/10"
          >
            Login
          </button>
        )}
      </form>
    </Form>
  );
}
