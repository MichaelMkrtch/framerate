import { CircleArrowRight } from "lucide-react";

export default function AuthForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative bottom-10 flex flex-col items-center">
      <h1 className="text-[28px] font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9370db] to-[#f4b541]">
        {title}
      </h1>
      <p className="mb-6 w-72 text-center text-sm tracking-wide text-gray font-medium">
        {description}
      </p>
      <div className="relative bg-white/[0.01] flex items-center ring-1 ring-white/10 rounded-full">
        <input
          type="email"
          placeholder="account email"
          autoFocus
          className="text-sm font-medium rounded-full pl-6 pr-3 py-3 w-80 bg-transparent outline-none placeholder:text-white/25 placeholder:font-medium"
        />
        <div className="pr-2.5 text-gray">
          <CircleArrowRight size={32} strokeWidth={1.1} />
        </div>
      </div>
    </section>
  );
}
