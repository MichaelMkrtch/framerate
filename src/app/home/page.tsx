"use client";

import { useAuthStore } from "@/store/auth/auth-store";
import Header from "@/components/Header";

export default function Home() {
  const name = useAuthStore((state) => state.name);
  const formattedName = name.charAt(0).toUpperCase() + name.substring(1);

  return (
    <>
      <Header title={`Welcome, ${formattedName}`} />
    </>
  );
}
