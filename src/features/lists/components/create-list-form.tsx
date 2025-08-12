import type { Dispatch, MouseEvent, SetStateAction } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { listSchema } from '../schema/list';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createList } from '@/server/lists';
import { useListStore } from '@/store/lists/list-store';

import ListDialog from './list-dialog';

export default function CreateListForm({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const addList = useListStore.use.addList();

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      listName: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof listSchema>) {
    const parsed = listSchema.safeParse(values);

    if (!parsed.success) {
      return toast.error('Please enter a valid list name');
    }

    const response = await createList(values.listName);

    if (response) {
      addList(response);
      setDialogOpen(false);
      return toast.success('List created');
    }

    toast.error(
      'Something went wrong while creating list! Please try again later',
    );
  }

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const formData = form.getValues();
    await onSubmit(formData);

    queryClient.invalidateQueries({ queryKey: ['lists'] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="listName"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-2.5">
              <FormLabel className="">Collection Name</FormLabel>
              <FormControl>
                <div
                  className={`w-full rounded-md ring-1 ring-white/10 ${form.formState.errors.listName && '!ring-red-500'}`}
                >
                  <Input
                    placeholder="Favorites"
                    autoComplete="off"
                    autoFocus
                    className="text-foreground block w-full rounded-md bg-white/5 px-3.5 py-2 outline-none placeholder:text-white/35"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is the name of the list where you will save movies and TV
                shows.
              </FormDescription>
              <FormMessage className="tracking-wide text-red-500" />
            </FormItem>
          )}
        />
        <ListDialog.Footer className="mt-8">
          <ListDialog.Cancel className="text-foreground border-background-light hover:bg-background-light inline-flex h-9 cursor-pointer items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium transition-colors">
            Cancel
          </ListDialog.Cancel>
          <ListDialog.Action
            type="submit"
            onClick={(event) => handleClick(event)}
            className="text-foreground inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-700"
          >
            Create
          </ListDialog.Action>
        </ListDialog.Footer>
      </form>
    </Form>
  );
}
