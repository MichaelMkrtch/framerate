import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as DialogUI,
  DialogContent as DialogUIContent,
} from "@web/components/ui/dialog";

export default function Dialog({
  dialogOpen,
  setDialogOpen,
  children,
}: {
  dialogOpen?: boolean;
  setDialogOpen?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <DialogUI open={dialogOpen} onOpenChange={setDialogOpen}>
      {children}
    </DialogUI>
  );
}

function DialogContent({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <DialogUIContent className="bg-background caret-foreground max-w-lg border border-white/5 p-6 outline-none">
      <DialogHeader className="mb-1">
        <DialogTitle className={`${description && "mb-2"} text-foreground`}>
          {title}
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogUIContent>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
Dialog.Close = DialogClose;
