"use client";

import * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const SearchDialog = DialogPrimitive.Root;
const SearchDialogTrigger = DialogPrimitive.Trigger;
const SearchDialogPortal = DialogPrimitive.Portal;
const SearchDialogClose = DialogPrimitive.Close;

const SearchDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SearchDialogPortal>
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "shadow-small fixed bottom-6 left-0 right-0 z-50 mx-auto grid w-[550px] grid-rows-[350px,_46px] gap-2.5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-1 data-[state=open]:slide-in-from-bottom-1 sm:rounded-lg 2xl:w-[600px]",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </SearchDialogPortal>
));
SearchDialogContent.displayName = DialogPrimitive.Content.displayName;

const SearchDialogHeader = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sr-only" {...props} />
);
SearchDialogHeader.displayName = "SearchDialogHeader";

const SearchDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className="sr-only" {...props} />
));
SearchDialogTitle.displayName = DialogPrimitive.Title.displayName;

const SearchDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className="text-sm text-neutral-500 dark:text-neutral-400"
    {...props}
  />
));
SearchDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  SearchDialog,
  SearchDialogPortal,
  SearchDialogTrigger,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogTitle,
  SearchDialogDescription,
};
