import type { ReactNode } from 'react';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from '@tanstack/react-router';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import { useAuthStore } from '@/store/auth/auth-store';

type HeaderProps = {
  title?: string;
  children?: ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  const { data: queryData, isError } = useQuery({
    queryKey: ['session'],
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
      setName('User');
      toast.error('Something went wrong while getting user information!', {
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
  }, [queryData, setEmail, setName, setUsername, isError]);

  return (
    <header className="flex h-[115px] items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <Link to="/home" className="mr-2 flex flex-col text-2xl leading-5">
          <span>Frame</span>
          <span>Rate</span>
        </Link>
        <div>
          <h1 className="text-xl font-semibold">
            {pathname === '/home' ? `Hello, ${name}` : title}
          </h1>
        </div>
      </div>

      <div>{children}</div>
    </header>
  );
}
