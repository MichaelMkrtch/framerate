import { ReactElement, type ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

type IconsTooltipProps = {
  content: ReactElement;
  side?: "bottom" | "top" | "right" | "left";
  children: ReactNode;
};

export default function IconsTooltip({
  content,
  side,
  children,
}: IconsTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button>{children}</button>
        </TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
