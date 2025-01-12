import type { ReactNode } from "react";

export default function CollectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="animate-fade-in">{children}</div>;
}
