"use client";

import { useState } from "react";

import SignupForm from "./SignupForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

export default function SignupDialog({ quote }: { quote: string }) {
  const [open, setOpen] = useState(false);

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

        <SignupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
