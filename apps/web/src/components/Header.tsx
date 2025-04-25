import type { ReactNode } from "react";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";

import { authClient } from "@web/lib/auth-client";
import { useAuthStore } from "@web/store/auth/auth-store";

import { toast } from "sonner";

type HeaderProps = {
  title?: string;
  children?: ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  const { data: queryData, isError } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const { name, setEmail, setName, setUsername } = useAuthStore();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  useEffect(() => {
    if (isError) {
      setName("User");
      toast.error("Something went wrong while getting user information!", {
        duration: 5000,
      });
      return;
    }

    const user = queryData?.data?.user;

    if (user) {
      setEmail(user.email);
      setName(user.name);
      setUsername(user.username!);
    }
  }, [queryData, setEmail, setName, setUsername]);

  return (
    <header className="flex h-[115px] items-center justify-between">
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
