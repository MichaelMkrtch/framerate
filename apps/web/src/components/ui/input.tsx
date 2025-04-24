import * as React from "react";

import { cn } from "@web/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input type={type} data-slot="input" className={cn(className)} {...props} />
  );
}

export { Input };
