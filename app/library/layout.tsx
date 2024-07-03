import { type ReactNode } from "react";

type LibraryLayoutProps = {
  children: ReactNode;
};

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return (
    <div className="px-3 pb-3 pt-20 md:px-0 md:pt-32">
      <h2 className="text-lg font-medium md:text-xl">Library</h2>
      <section className="mt-3">{children}</section>
    </div>
  );
}
