import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import AuthModal from "@/components/home/AuthModal";
import LoginForm from "@/components/home/LoginForm";
import SignupForm from "@/components/home/SignupForm";
import Trending from "@/components/home/Trending";
import { validateRequest } from "@/lib/auth";
import { fetchTrendingMovies } from "@/services/fetchTrendingMovies";

export default async function Home() {
  const result = await validateRequest();

  const pageContent = result.user ? (
    <>
      <h2 className="mb-3 text-lg font-medium">Everyone&apos;s Watching...</h2>
      <Trending />
    </>
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
    queryKey: ["trending-week"],
    queryFn: () => fetchTrendingMovies("week"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-[calc(90dvh)] px-3 pt-20 md:px-0 md:pt-32">
        {pageContent}
      </main>
    </HydrationBoundary>
  );
}
