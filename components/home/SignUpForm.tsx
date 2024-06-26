"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import Input from "@/components/ui/Input";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character." })
    .max(50, { message: "Name must be at most 50 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(15, { message: "Username must be at most 15 characters. " }),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters." })
    .max(30, { message: "Password must be at most 30 characters." }),
});

export default function SignUpForm({ quote }: { quote: string }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded bg-emerald-400 px-4 py-2 font-medium text-gray-850">
          Sign Up
        </button>
      </DialogTrigger>

      <DialogContent className="hidden h-fit w-1/2 max-w-md border-0 p-6 text-zinc-300 caret-zinc-300 outline-none ring-1 md:block dark:bg-neutral-900 dark:ring-neutral-800">
        <DialogHeader className="mb-6">
          <DialogTitle className="tracking-wide">Join Lumière</DialogTitle>
          <DialogDescription className="pt-1 text-zinc-200">
            {quote}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
                        placeholder="john@email.com"
                        field={field}
                        autocomplete="email"
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
                        placeholder="John"
                        field={field}
                        autocomplete="name"
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
                        placeholder="john123"
                        field={field}
                        autocomplete="username"
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
                      <Input type="password" field={field} />
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
                  className="rounded bg-emerald-400 px-3 py-1.5 font-medium text-gray-850 outline-none ring-1 ring-emerald-300 transition-all duration-150 ease-in hover:shadow-[0_2px_20px_rgba(52,_211,_153,_0.7)]"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
