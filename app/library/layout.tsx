import { type ReactNode } from "react";

type LibraryLayoutProps = {
  children: ReactNode;
};

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return (
    <div className="pt-32">
      <h2 className="text-2xl font-medium">Library</h2>
      <section className="mt-6">{children}</section>
    </div>
  );
}
