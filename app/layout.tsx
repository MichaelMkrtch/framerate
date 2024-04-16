import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';

const plusJKSans = Plus_Jakarta_Sans({ subsets: ['latin'] });
const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lumière',
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
      <body className={plusJKSans.className}>
        <div className="sm:px-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
