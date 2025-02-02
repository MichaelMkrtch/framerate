import type { ReactNode } from "react";

export default function EditCollectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <header className="mb-10 mt-9 flex items-center border-b border-white/[0.08]">
        <h1 className="mb-4 text-[22px] font-semibold">Edit Collection</h1>
      </header>
      {children}
    </div>
  );
}
