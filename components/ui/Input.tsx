import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded px-3 py-2 text-sm font-medium text-zinc-200 shadow-sm outline-none ring-1 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:select-none placeholder:font-medium focus:animate-ios-safari-prevent-scroll-on-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:focus:animate-none dark:bg-neutral-800 dark:ring-white/10 dark:placeholder:text-neutral-600",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
