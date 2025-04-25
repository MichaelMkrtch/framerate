import { Link } from "@tanstack/react-router";

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
    <footer className="text-gray absolute right-0 bottom-6 left-0 text-center text-sm font-medium">
      <div className="gradient-border h-[1px] w-full"></div>
      <p className="mt-6">
        {text}
        <Link to={linkTo} className="text-foreground">
          {" "}
          {linkText}
        </Link>
        .
      </p>
    </footer>
  );
}
