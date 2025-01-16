import type { Metadata } from "next";

import { Manrope } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import Providers from "./providers";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bespokeSerif = localFont({
  src: "../fonts/bespokeserif-variable.woff2",
  variable: "--font-bespoke-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FrameRate",
  description:
    "FrameRate is the ultimate social platform for movie and show enthusiasts. Share your reviews, create and discover curated lists, and effortlessly track everything you've watched!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="inset-0 size-full">
      <head>
        <meta name="apple-mobile-web-app-title" content="FrameRate" />
      </head>
      <body
        className={`${manrope.variable} ${bespokeSerif.variable} size-full`}
      >
        <Providers>
          <div className="mx-auto h-full max-w-md antialiased md:max-w-2xl lg:max-w-6xl xl:max-w-[1200px]">
            {children}
            <Navbar />
          </div>
        </Providers>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "bg-[#1c1e22] border-white/10 text-white drop-shadow-md",
            },
          }}
        />
      </body>
    </html>
  );
}
