import type { ReactNode } from "react";

import Header from "@/components/Header";
import Sidebar from "@/features/collections/components/Sidebar";

export default function GlobalCollectionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid h-dvh grid-flow-row grid-cols-[250px,_1fr] grid-rows-[120px,_1fr] gap-2.5 pb-[94px]">
      <Header title="Collections" classes="col-span-2 col-start-1" />

      <Sidebar />

      <div className="col-start-2 animate-fade-in-fast overflow-scroll rounded-lg">
        {children}
      </div>
    </div>
  );
}
