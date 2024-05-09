import Header from "@/components/ui/Header";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const plusJKSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
      <body className={`${plusJKSans.className} bg-gray-950 text-zinc-200`}>
        <div className="fixed inset-0 sm:px-8">
          <div className="m-auto w-full max-w-7xl">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
