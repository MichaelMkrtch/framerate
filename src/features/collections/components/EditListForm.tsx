"use client";

import type { List } from "@/types/data.types";
import type { Dispatch, SetStateAction } from "react";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useActiveListStore } from "@/store/collections/active-list-store";
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

export default function EditListForm({
  setReturnLink,
}: {
  setReturnLink: Dispatch<SetStateAction<string>>;
}) {
  const { username, collectionName: listName } = useParams<{
    username: string;
    collectionName: string;
  }>();

  const { addList, removeList } = useListStore();
  const { activeList } = useActiveListStore();

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      listName: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof listSchema>) {
    const requestBody = {
      username,
      slug: listName,
      ...values,
    };

    const response = await fetch(`/api/${username}/collections/${listName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data: { message: string; results: List } = await response.json();

    if (response.ok) {
      // Replaces old list with updated one
      removeList(data.results.id);
      addList(data.results);
      setReturnLink(`/${username}/collections/${data.results.slug}`);
      return toast.success(data.message);
    }

    toast.error(data.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="listName"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-2.5">
              <FormLabel className="text-base">Name</FormLabel>
              <FormControl>
                <div
                  className={`w-[500px] rounded-md ring-1 ring-white/10 ${form.formState.errors.listName && "!ring-red-500"}`}
                >
                  <Input
                    placeholder={activeList?.name ?? "Favorites"}
                    autoComplete="off"
                    autoFocus
                    className="block w-full rounded-md bg-background-lighter px-3.5 py-2 text-foreground outline-none placeholder:text-white/35"
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
        <button className="float-right mt-2 rounded bg-emerald-500 px-4 py-1.5 font-semibold">
          Save
        </button>
      </form>
    </Form>
  );
}
