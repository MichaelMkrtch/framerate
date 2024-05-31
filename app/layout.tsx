import Header from "@/components/ui/Header";
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
          <div className="m-auto w-full max-w-5xl">
            <QueryProvider>
              <Header />
              {children}
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
