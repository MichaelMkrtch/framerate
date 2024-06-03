import { type ReactNode } from "react"

type CardProps = {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded bg-gray-850/45 backdrop-blur-xl px-5 pt-3 pb-4 ring-1 ring-gray-750/30">
      {children}
    </div>
  )
}