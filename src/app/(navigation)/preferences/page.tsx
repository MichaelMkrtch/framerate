"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowUpRight, CircleHelp, LogOut, Mail, User } from "lucide-react";

import { useAuthStore } from "@/store/auth/auth-store";
import { useActiveListStore } from "@/store/collections/active-list-store";
import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import { useReviewStore } from "@/store/details/review-store";
import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";

export default function PreferencesPage() {
  const { username, name, email, setUsername, setName, setEmail, reset } =
    useAuthStore();
  const { clearActiveList } = useActiveListStore();
  const { clearListItems } = useListItemStore();
  const { clearLists } = useListStore();
  const { clearMediaActions } = useReviewStore();

  const router = useRouter();

  async function handleSignOut() {
    reset();
    clearActiveList();
    clearListItems();
    clearLists();
    clearMediaActions();
    sessionStorage.clear();
    localStorage.clear();

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  // function handleChange(event, field) {
  //   setName(event.target.value);
  // }

  return (
    <>
      <Header title="Preferences">
        <button
          onClick={handleSignOut}
          className="shadow-small relative flex items-center gap-2 rounded-md border border-white/10 bg-background-lighter px-2 py-1.5 text-sm font-medium text-white transition-colors duration-75 ease-in hover:bg-background-accent"
        >
          <LogOut width={16} height={16} />
          Sign out
        </button>
      </Header>

      <main className="grid grid-cols-[55%,45%] gap-7">
        <div className="space-y-7 rounded-md bg-background-darker px-8 py-7">
          <section className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="rounded-lg bg-[#F98513] bg-background-lighter bg-opacity-10 p-2 text-[#F98513]">
                <User />
              </span>

              <span className="text-base font-semibold">Account</span>
            </div>

            <div className="ml-28 flex w-full flex-col gap-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                // onChange={(e) => handleChange(e, "name")}
                className="rounded border border-white/5 bg-background-lighter px-3 py-2 font-medium placeholder:font-medium placeholder:text-gray/50 focus:outline focus:outline-[#522aff]"
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                // onChange={(e) => handleChange(e, "username")}
                className="rounded border border-white/5 bg-background-lighter px-3 py-2 font-medium placeholder:font-medium placeholder:text-gray/50 focus:outline focus:outline-[#522aff]"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                // onChange={(e) => handleChange(e, "email")}
                className="rounded border border-white/5 bg-background-lighter px-3 py-2 font-medium placeholder:font-medium placeholder:text-gray/50 focus:outline focus:outline-[#522aff]"
              />
            </div>
          </section>

          <section className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="rounded-lg bg-[#0C8346] bg-background-lighter bg-opacity-10 p-2 text-[#0C8346]">
                <CircleHelp />
              </span>

              <span className="text-base font-semibold">Support</span>
            </div>

            <a
              href="mailto:help@frame-rate.io"
              className="ml-28 flex w-full items-center justify-between rounded bg-background-lighter px-3 py-2 text-start font-medium"
            >
              <span className="flex items-center gap-3">
                <Mail strokeWidth={1.5} size={20} />
                Get Help
              </span>
              <ArrowUpRight strokeWidth={1.5} size={20} />
            </a>
          </section>
        </div>

        <div className="flex items-start gap-x-3 rounded-md bg-background-darker px-8 py-7">
          <Link
            href="/tiers"
            className="shadow-small relative flex w-fit items-center gap-2 rounded-md border border-white/10 bg-background-lighter px-2 py-1.5 font-medium text-white transition-colors duration-75 ease-in hover:bg-background-accent"
          >
            View Tiers
          </Link>

          <Link
            href="/api/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-small relative flex w-fit items-center gap-2 rounded-md border border-white/10 bg-background-lighter px-2 py-1.5 font-medium text-white transition-colors duration-75 ease-in hover:bg-background-accent"
          >
            Manage Subscription
          </Link>
        </div>
      </main>
    </>
  );
}
