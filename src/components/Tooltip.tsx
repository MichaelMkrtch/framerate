import type { ReactNode } from "react";

import { ReactElement } from "react";

import {
  TooltipContent,
  TooltipTrigger,
  Tooltip as TooltipUI,
} from "@/components/ui/tooltip-ui";

type TooltipProps = {
  side: "top" | "right" | "bottom" | "left" | undefined;
  sideOffset: number;
  content: string | ReactElement;
  key1?: string;
  key2?: string;
  isEnabled?: boolean;
  children: ReactNode;
};

export default function Tooltip({
  side,
  sideOffset,
  content,
  key1,
  key2,
  children,
  isEnabled,
}: TooltipProps) {
  return (
    <TooltipUI open={isEnabled}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        className="slide-in-from-bottom-2"
      >
        <div className="text-[13px] tracking-wide">
          {content}
          {key1 && (
            <>
              <span
                className={`${key1 && key2 ? "pl-3.5" : ""} ${key1 && !key2 ? "pl-2" : ""}`}
              ></span>
              <span className="rounded bg-white/10 px-1 py-[1px] text-xs">
                {key1}
              </span>
            </>
          )}
          {key2 && (
            <>
              <span> then </span>
              <span className="rounded bg-white/10 px-1 py-[1px] text-xs">
                {key2}
              </span>
            </>
          )}
        </div>
      </TooltipContent>
    </TooltipUI>
  );
}
