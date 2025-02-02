"use client";

import { redirect } from "next/navigation";

import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth/auth-store";
import { useActiveListStore } from "@/store/collections/active-list-store";
import { useListItemStore } from "@/store/collections/list-item-store";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";

export default function PreferencesPage() {
  const { reset } = useAuthStore();
  const { clearActiveList } = useActiveListStore();
  const { clearListItems } = useListItemStore();

  async function handleSignOut() {
    reset();
    clearActiveList();
    clearListItems();
    sessionStorage.clear();
    localStorage.clear();

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
