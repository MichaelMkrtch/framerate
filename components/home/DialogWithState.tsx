"use client";

import { type ReactNode } from "react";

import { Dialog } from "@/components/ui/Dialog";

export default function DialogWithState({ children }: { children: ReactNode }) {
  return <Dialog>{children}</Dialog>;
}
