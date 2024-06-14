import QueryProvider from "@/components/QueryProvider";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/Sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  League_Gothic,
  Noto_Sans_JP,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";

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

export const metadata: Metadata = {
  title: "Lumière",
  description:
    "Lumière is a social platform for sharing your interests in film. Use it to record your opinions about films you watch, or just to keep track of what you've seen!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${leagueGothic.variable} ${notoSansJP.variable} ${plusJKSans.variable} bg-gray-950 font-jakarta text-zinc-200`}
      >
        <div className="inset-0 pb-4 md:px-8 md:py-0" vaul-drawer-wrapper="">
          <div className="relative m-auto max-w-md md:max-w-2xl md-tablet:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
            <QueryProvider>
              <Header />
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
