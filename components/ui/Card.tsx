import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded bg-gray-850/45 px-5 pb-5 pt-4 ring-1 ring-gray-750/30 backdrop-blur-xl">
      {children}
    </div>
  );
}
