import type { ReactNode } from "react";

import { useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { authClient } from "@web/lib/auth-client";
import { useAuthStore } from "@web/store/auth/auth-store";

import { toast } from "sonner";

type HeaderProps = {
  title?: string;
  classes?: string;
  children?: ReactNode;
};

export default function Header({ title, classes, children }: HeaderProps) {
  const { data: session, error } = authClient.useSession();
  const { name, setEmail, setName, setUsername } = useAuthStore();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

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
  }, [error, session, setEmail, setName, setUsername]);

  return (
    <header
      className={`${classes} flex h-[115px] items-center justify-between`}
    >
      <div className="flex items-center justify-center gap-3">
        <Link to="/home">
          <img src="/logo.svg" alt="FrameRate logo" width="22" height="22" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">
            {pathname === "/home" ? `Hello, ${name}` : title}
          </h1>
        </div>
      </div>

      <div>{children}</div>
    </header>
  );
}
