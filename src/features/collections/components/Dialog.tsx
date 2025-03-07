import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {children}
    </AlertDialog>
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
    <AlertDialogContent className="border border-white/5 bg-background-darker p-6 caret-foreground outline-none">
      <AlertDialogHeader className="mb-1">
        <AlertDialogTitle
          className={`${description && "mb-2"} text-foreground`}
        >
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      {children}
    </AlertDialogContent>
  );
}

Dialog.Trigger = AlertDialogTrigger;
Dialog.Content = DialogContent;
Dialog.Footer = AlertDialogFooter;
Dialog.Cancel = AlertDialogCancel;
Dialog.Action = AlertDialogAction;
