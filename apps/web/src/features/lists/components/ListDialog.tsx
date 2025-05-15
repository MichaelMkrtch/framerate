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
} from "@web/components/ui/alert-dialog";

export default function ListDialog({
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

function ListDialogContent({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <AlertDialogContent className="bg-background caret-foreground border border-white/5 p-6 outline-none">
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

ListDialog.Trigger = AlertDialogTrigger;
ListDialog.Content = ListDialogContent;
ListDialog.Footer = AlertDialogFooter;
ListDialog.Cancel = AlertDialogCancel;
ListDialog.Action = AlertDialogAction;
