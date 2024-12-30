"use client";

import { redirect } from "next/navigation";

import { useAuthStore } from "@/store/auth/auth-store";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const name = useAuthStore((state) => state.name);
  const formattedName = name.charAt(0).toUpperCase() + name.substring(1);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  }

  return (
    <>
      <Header title={`Hello, ${formattedName}`} />
      <button onClick={handleSignOut} className="absolute bottom-24 right-32">
        Sign out
      </button>
    </>
  );
}
