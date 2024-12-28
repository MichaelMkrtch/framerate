import Link from "next/link";

import { Fingerprint, Ticket } from "lucide-react";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between pt-8">
        <Link href="/">
          <h1 className="text-3xl font-extrabold">FrameRate</h1>
        </Link>

        <div className="flex items-center gap-10 font-semibold">
          <Link href="/login" className="group/login flex items-center gap-2">
            <span className="text-gray transition-colors duration-200 group-hover/login:text-white">
              <Fingerprint size={18} />
            </span>
            Login
          </Link>

          <Link
            href="/signup"
            className="highlight-bg group/trial peer flex items-center gap-2 rounded-full border border-transparent px-3.5 py-0.5"
          >
            <span className="text-gray transition-colors duration-200 group-hover/trial:text-white">
              <Ticket size={18} />
            </span>
            Start your trial
          </Link>
        </div>
      </nav>
    </header>
  );
}
