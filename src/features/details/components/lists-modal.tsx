import { type ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog-ui';

export default function ListsModal({ children }: { children: ReactNode }) {
  return <Dialog>{children}</Dialog>;
}

function ListsModalContent({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <DialogContent className="bg-background caret-foreground top-[30%] w-4/5 border border-white/5 p-6 outline-none md:top-[50%] md:w-1/2 md:max-w-lg">
      <DialogHeader className="mb-4">
        <DialogTitle className="mb-0.5 tracking-wide">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="h-[300px] overflow-y-scroll">{children}</div>
    </DialogContent>
  );
}

ListsModal.Trigger = DialogTrigger;
ListsModal.Content = ListsModalContent;
