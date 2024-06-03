import { type ReactNode } from "react"

type CardProps = {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="rounded bg-gray-850/45 backdrop-blur-xl px-4 pt-4 pb-5 ring-1 ring-gray-750/30">
      {children}
    </div>
  )
}