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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
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
