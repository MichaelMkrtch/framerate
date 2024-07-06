import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import AuthModal from "@/components/home/AuthModal";
import Home from "@/components/home/Home";
import LoginForm from "@/components/home/LoginForm";
import SignupForm from "@/components/home/SignupForm";
import { validateRequest } from "@/lib/auth";
import { fetchTrending } from "@/services/fetchTrending";

export default async function HomePage() {
  const result = await validateRequest();

  const pageContent = result.user ? (
    <Home />
  ) : (
    <div className="m-auto flex h-full items-center justify-center">
      <div className="flex w-[214px] justify-between">
        <AuthModal>
          <AuthModal.Trigger asChild>
            <button className="rounded bg-emerald-400 px-4 py-2 font-medium text-gray-850">
              Get started
            </button>
          </AuthModal.Trigger>

          <AuthModal.Content title="Join Lumière">
            <SignupForm />
          </AuthModal.Content>
        </AuthModal>

        <AuthModal>
          <AuthModal.Trigger asChild>
            <button className="rounded bg-cyan-350 px-4 py-2 font-medium text-gray-850">
              Sign in
            </button>
          </AuthModal.Trigger>

          <AuthModal.Content title="Sign in to your account">
            <LoginForm />
          </AuthModal.Content>
        </AuthModal>
      </div>
    </div>
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-trending-week"],
    queryFn: () => fetchTrending("movie", "week"),
    staleTime: 10 * 60 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ["tv-trending-week"],
    queryFn: () => fetchTrending("tv", "week"),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-[calc(90dvh)] px-3 pt-20 md:px-0 md:pt-32">
        {pageContent}
      </main>
    </HydrationBoundary>
  );
}
