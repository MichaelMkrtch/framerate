import { type ReactNode } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { VisuallyHidden } from "./VisuallyHidden";

export default function Modal({ children }: { children: ReactNode }) {
  return <Dialog>{children}</Dialog>;
}

function ModalContent({
  title,
  description,
  classes,
  children,
}: {
  title: string;
  description: string;
  classes?: string;
  children: ReactNode;
}) {
  return (
    <DialogContent className="hidden max-w-2xl border-0 text-zinc-300 caret-zinc-300 outline-none ring-1 md:block md:h-[427px] md:px-3 md:py-2.5 dark:bg-neutral-900 dark:ring-neutral-800">
      <VisuallyHidden asChild>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      {children}
    </DialogContent>
  );
}

Modal.Trigger = DialogTrigger;
Modal.Close = DialogClose;
Modal.Content = ModalContent;
