"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type AuthModalContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AuthModalContext = createContext<AuthModalContext | null>(null);

export function useAuthModalContext() {
  const authModalContext = useContext(AuthModalContext);

  if (authModalContext === null) {
    throw new Error(
      "authModalContext must be used within <AuthModalContext.Provider />",
    );
  }

  return authModalContext;
}

export default function AuthModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const authModalContext = {
    open: open,
    setOpen: setOpen,
  };

  return (
    <AuthModalContext.Provider value={authModalContext}>
      {children}
    </AuthModalContext.Provider>
  );
}
