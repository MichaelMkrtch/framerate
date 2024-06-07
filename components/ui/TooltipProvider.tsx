import { ReactElement, type ReactNode } from "react";

import {
  TooltipProvider as Provider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./Tooltip";

type TooltipProviderProps = {
  isEnabled?: boolean;
  delay?: number;
  side?: "bottom" | "top" | "right" | "left";
  content: ReactElement;
  children: ReactNode;
};

export default function TooltipProvider({
  isEnabled,
  delay,
  side,
  content,
  children,
}: TooltipProviderProps) {
  return (
    <Provider>
      <Tooltip open={isEnabled} delayDuration={delay}>
        <TooltipTrigger asChild>
          <button>{children}</button>
        </TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </Provider>
  );
}
