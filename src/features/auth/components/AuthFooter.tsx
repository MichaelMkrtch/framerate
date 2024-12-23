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
    <footer className="absolute bottom-6 left-0 right-0 text-center text-sm font-medium text-gray">
      <div className="gradient-highlight h-[1px] w-full"></div>
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
