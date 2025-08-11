import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

function SearchDialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function SearchDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function SearchDialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function SearchDialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function SearchDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <SearchDialogPortal data-slot="dialog-portal">
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-1 data-[state=open]:slide-in-from-bottom-1 fixed right-0 bottom-6 left-0 z-50 mx-auto grid w-[550px] grid-rows-[350px,_46px] gap-2.5 shadow-sm sm:rounded-lg 2xl:w-[600px]',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </SearchDialogPortal>
  );
}

function SearchDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function SearchDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('sr-only', className)}
      {...props}
    />
  );
}

function SearchDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-sm text-neutral-500 dark:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
}

export {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogDescription,
  SearchDialogHeader,
  SearchDialogPortal,
  SearchDialogTitle,
  SearchDialogTrigger,
};
