import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  League_Gothic,
  Noto_Sans_JP,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";

import QueryProvider from "@/components/QueryProvider";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/Sonner";
import { validateRequest } from "@/lib/auth";
import { fetchTrending } from "@/services/fetchTrending";

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-gothic",
});
const plusJKSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata = {
  title: "Lumière",
  description:
    "Lumière is a social platform for sharing your interests in film. Use it to record your opinions about films you watch, or just to keep track of what you've seen!",
};

async function PrefetchHeader() {
  const result = await validateRequest();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-trending-day"],
    queryFn: () => fetchTrending("all", "day"),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header user={result.user} />
    </HydrationBoundary>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${leagueGothic.variable} ${notoSansJP.variable} ${plusJKSans.variable} !pointer-events-auto bg-gray-950 font-jakarta text-zinc-200`}
      >
        <div
          className="inset-0 h-[calc(100dvh)] pb-4 md:px-8 md:py-0"
          vaul-drawer-wrapper=""
        >
          <div className="relative m-auto max-w-md md:max-w-2xl md-tablet:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            <QueryProvider>
              <PrefetchHeader />
              {children}
            </QueryProvider>
          </div>
        </div>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "bg-[#1e1e21] border-gray-750/45 text-zinc-200",
            },
          }}
        />
      </body>
    </html>
  );
}
