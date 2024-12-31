"use client";

import type { ReactNode } from "react";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toast } from "sonner";

import { useAuthStore } from "@/store/auth/auth-store";
import { authClient } from "@/lib/auth-client";

type HeaderProps = {
  title?: string;
  children?: ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  const { data: session, error } = authClient.useSession();
  const pathname = usePathname();

  const email = useAuthStore((state) => state.email);
  const name = useAuthStore((state) => state.name);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setName = useAuthStore((state) => state.setName);
  const setUsername = useAuthStore((state) => state.setUsername);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      setName(session.user.name);
      setUsername(session.user.username!);
    }

    if (error) {
      setName("User");
      toast.error("Something went wrong while getting user information!", {
        duration: 5000,
      });
    }
  });

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const fullDate = new Intl.DateTimeFormat("en-US", options).format();

  return (
    <header className="flex h-[120px] items-center justify-between">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/framerate.svg"
            alt="FrameRate logo"
            width="70"
            height="70"
          />
        </Link>
        <div>
          <h1 className="text-[22px] font-semibold">
            {pathname === "/home" ? `Hello, ${name}` : title}
          </h1>
          <p className="-mt-1 text-gray">
            {pathname === "/preferences" ? email : fullDate}
          </p>
        </div>
      </div>

      <div>{children}</div>
    </header>
  );
}
