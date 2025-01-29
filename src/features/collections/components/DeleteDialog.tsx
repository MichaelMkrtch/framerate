import type { ReactNode } from "react";

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

export default function DeleteDialog({ children }: { children: ReactNode }) {
  return <AlertDialog>{children}</AlertDialog>;
}

function DialogContent({
  title,
  description,
  action,
  handleClick,
}: {
  title: string;
  description: string;
  action: string;
  handleClick: () => void;
}) {
  return (
    <AlertDialogContent className="border border-white/5 bg-background-darker p-6 caret-foreground outline-none">
      <AlertDialogHeader className="mb-4">
        <AlertDialogTitle className="mb-2 text-foreground">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          className="border-red-800 bg-red-600 hover:bg-red-700"
          onClick={handleClick}
        >
          {action}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

DeleteDialog.Trigger = AlertDialogTrigger;
DeleteDialog.Content = DialogContent;
