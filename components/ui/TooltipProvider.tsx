import { ReactElement, type ReactNode } from "react";

import {
  TooltipProvider as Provider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./Tooltip";

type TooltipProviderProps = {
  delay?: number;
  side?: "bottom" | "top" | "right" | "left";
  content: ReactElement;
  children: ReactNode;
};

export default function TooltipProvider({
  delay,
  side,
  content,
  children,
}: TooltipProviderProps) {
  return (
    <Provider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>
          <button>{children}</button>
        </TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </Provider>
  );
}
