"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth/auth-store";
import { useActiveListStore } from "@/store/collections/active-list-store";
import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import { useReviewStore } from "@/store/details/review-store";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";

export default function PreferencesPage() {
  const { reset } = useAuthStore();
  const { clearActiveList } = useActiveListStore();
  const { clearListItems } = useListItemStore();
  const { clearLists } = useListStore();
  const { clearMediaActions } = useReviewStore();

  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });

    reset();
    clearActiveList();
    clearListItems();
    clearLists();
    clearMediaActions();
    sessionStorage.clear();
    localStorage.clear();
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

      <main>
        <Link href="/tiers" className="rounded bg-background-accent px-3 py-2">
          View Tiers
        </Link>
        <a href="/api/portal" target="_blank">
          Manage Subscription
        </a>
      </main>
    </>
  );
}
