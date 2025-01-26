import type { ReactNode } from "react";

export default async function CollectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="animate-fade-in">{children}</div>;
}
