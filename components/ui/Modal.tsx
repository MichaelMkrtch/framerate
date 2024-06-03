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
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <DialogContent className="hidden border-0 bg-neutral-900 text-zinc-300 caret-zinc-300 outline-none ring-1 ring-neutral-800 md:block md:h-[427px] md:px-3 md:py-2.5 lg:w-1/2">
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
