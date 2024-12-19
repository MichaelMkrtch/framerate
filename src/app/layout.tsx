import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const bespokeSerif = localFont({
  src: '../fonts/bespokeserif-variable.woff2',
  variable: '--font-bespoke-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FrameRate',
  description:
    "FrameRate is the ultimate social platform for movie and show enthusiasts. Share your reviews, create and discover curated lists, and effortlessly track everything you've watched!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="FrameRate" />
      </head>
      <body
        className={`${manrope.variable} ${bespokeSerif.variable} antialiased m-auto max-w-md md:max-w-2xl lg:max-w-6xl xl:max-w-[1350px]`}
      >
        {children}
      </body>
    </html>
  );
}
