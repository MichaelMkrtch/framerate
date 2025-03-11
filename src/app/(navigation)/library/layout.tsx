"use client";

import type { ReactNode } from "react";

import Header from "@/components/Header";

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header title="Library" />

      <div className="pb-20">{children}</div>
    </>
  );
}
