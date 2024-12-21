import Link from "next/link";

export default function AuthFooter({
  text,
  linkText,
  linkTo,
}: {
  text: string;
  linkText: string;
  linkTo: string;
}) {
  return (
    <footer className="absolute bottom-6 text-gray font-medium text-sm text-center left-0 right-0">
      <div className="gradient-highlight w-full h-[1px]"></div>
      <p className="mt-6">
        {text}
        <Link href={linkTo} className="text-white">
          {" "}
          {linkText}
        </Link>
        .
      </p>
    </footer>
  );
}
