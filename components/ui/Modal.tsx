import { ReactNode } from "react";
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
    <DialogContent className="bg-gray-850 ring-gray-750 border-0 text-zinc-300 caret-zinc-300 ring-1 sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>
        <button type="submit">Save changes</button>
      </DialogFooter>
    </DialogContent>
  );
}

Modal.Trigger = DialogTrigger;
Modal.Content = ModalContent;
