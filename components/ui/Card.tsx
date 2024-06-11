import { type ReactNode } from "react";

type CardProps = {
  classes?: string;
  children: ReactNode;
};

export default function Card({ classes, children }: CardProps) {
  return (
    <div
      className={`${classes} rounded bg-gray-850/45 px-2.5 pb-3.5 pt-3.5 ring-1 ring-gray-750/30 backdrop-blur-xl lg:px-5 lg:pb-5 lg:pt-4`}
    >
      {children}
    </div>
  );
}
