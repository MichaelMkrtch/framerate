import { type ReactNode } from "react";
import { VisuallyHidden } from "./VisuallyHidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

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
    <DialogContent className="bg-gray-850 ring-gray-750 hidden border-0 text-zinc-300 caret-zinc-300 outline-none ring-1 md:block md:px-3 md:py-2.5 lg:w-1/2">
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
Modal.Content = ModalContent;
