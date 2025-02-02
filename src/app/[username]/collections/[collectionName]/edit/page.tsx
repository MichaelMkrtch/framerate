"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeftCircle } from "lucide-react";

import EditListForm from "@/features/collections/components/EditListForm";

export default function EditCollectionPage() {
  const router = useRouter();
  const [returnLink, setReturnLink] = useState("");

  function handleClick() {
    if (!returnLink) {
      return router.back();
    }

    router.push(returnLink);
  }

  return (
    <main>
      <button onClick={handleClick}>
        <ArrowLeftCircle
          size={26}
          strokeWidth={1.5}
          className="mb-6 cursor-pointer text-gray transition-colors duration-200 hover:text-white"
        />
      </button>
      <div className="grid grid-cols-[500px,1fr] gap-5">
        <EditListForm setReturnLink={setReturnLink} />
        <div className="flex h-[320px] items-center justify-center rounded-md bg-background-lighter">
          <p className="text-base font-medium">Image upload coming soon!</p>
        </div>
      </div>
    </main>
  );
}
