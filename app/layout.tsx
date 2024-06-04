import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/Sonner";
import type { Metadata } from "next";
import {
  League_Gothic,
  Noto_Sans_JP,
  Plus_Jakarta_Sans,
} from "next/font/google";

import QueryProvider from "@/utils/queryProvider";

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
    <html lang="en">
      <body
        className={`${leagueGothic.variable} ${notoSansJP.variable} ${plusJKSans.variable} font-jakarta bg-gray-950 text-zinc-200`}
      >
        <div className="inset-0 sm:px-8">
          <div className="m-auto w-full lg:max-w-5xl xl:max-w-6xl">
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
      </body>
    </html>
  );
}
