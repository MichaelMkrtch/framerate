import type { List } from "@/types/data.types";
import type { Dispatch, MouseEvent, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAuthStore } from "@/store/auth/auth-store";
import { useListStore } from "@/store/collections/list-store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { listSchema } from "../schema/list";
import Dialog from "./Dialog";

export default function CreateListForm({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { username } = useAuthStore();
  const { addList } = useListStore();

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      listName: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof listSchema>) {
    const parsed = listSchema.safeParse(values);

    if (!parsed.success) {
      return toast.error("Please enter a valid name");
    }

    const response = await fetch(`/api/${username}/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data: { message: string; results: List } = await response.json();

    if (response.ok) {
      addList(data.results);
      setDialogOpen(false);
      return toast.success(data.message);
    }

    toast.error(data.message);
  }

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const formData = form.getValues();
    await onSubmit(formData);
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
                  className={`w-full rounded-md ring-1 ring-white/10 ${form.formState.errors.listName && "!ring-red-500"}`}
                >
                  <Input
                    placeholder="Favorites"
                    autoComplete="off"
                    autoFocus
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-foreground outline-none placeholder:text-white/35"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is the name of the list where you will save movies and TV
                shows.
              </FormDescription>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <Dialog.Footer className="mt-8">
          <Dialog.Cancel className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground">
            Cancel
          </Dialog.Cancel>
          <Dialog.Action
            type="submit"
            onClick={(event) => handleClick(event)}
            className="border-emerald-800 bg-emerald-600 hover:bg-emerald-700"
          >
            Create
          </Dialog.Action>
        </Dialog.Footer>
      </form>
    </Form>
  );
}
