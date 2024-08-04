import { Cross2Icon } from "@radix-ui/react-icons";
import { type ReactNode } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

export default function ListsModal({ children }: { children: ReactNode }) {
  return <Dialog>{children}</Dialog>;
}

function ListsModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <DialogContent className="top-[30%] w-4/5 border-0 p-6 text-zinc-300 caret-zinc-300 outline-none ring-1 md:top-[50%] md:w-1/2 md:max-w-md dark:bg-neutral-900 dark:ring-neutral-800">
      <DialogHeader className="mb-4">
        <DialogTitle className="tracking-wide">{title}</DialogTitle>
      </DialogHeader>
      <div className="no-scrollbar max-h-[300px] overflow-y-scroll">
        {children}
      </div>
      <DialogClose asChild>
        <div className="focus-ring-2 absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
      </DialogClose>
    </DialogContent>
  );
}

ListsModal.Trigger = DialogTrigger;
ListsModal.Content = ListsModalContent;
