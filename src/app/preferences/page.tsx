"use client";

import { redirect } from "next/navigation";

import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth/auth-store";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";

export default function PreferencesPage() {
  async function handleSignOut() {
    useAuthStore.persist.clearStorage();

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
      <Header title="Preferences">
        <button
          onClick={handleSignOut}
          className="shadow-small highlight-gradient flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-sm text-white"
        >
          <LogOut width={16} height={16} strokeWidth={1.5} />
          Sign out
        </button>
      </Header>
    </>
  );
}
