import { RefObject, useRef, useState } from "react";

import { List } from "@/types/data.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

import { useListStore } from "@/store/collections/list-store";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { listSchema } from "@/features/details/schema/list";

export default function CreateList() {
  const { addList } = useListStore();
  const [isChecked, setIsChecked] = useState<boolean | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);
  const createListRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      listName: "",
    },
  });

  function handleClickInput() {
    setIsChecked(inputRef.current?.checked);
    createListRef.current?.focus();
  }

  function toggleCreateList() {
    if (inputRef.current?.checked) {
      inputRef.current.checked = false;
      setIsChecked(false);
    }
  }

  useOnClickOutside(labelRef as RefObject<HTMLElement>, toggleCreateList);

  async function onSubmit(values: z.infer<typeof listSchema>) {
    const parsed = listSchema.safeParse(values);

    if (!parsed.success) return toast.error("Please enter a valid name");

    const response = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    const data: { message: string; results: List } = await response.json();

    if (response.ok) {
      addList(data.results);
      toggleCreateList();
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
            <FormItem className="mb-2.5 space-y-0">
              <FormLabel className="sr-only">Collection Name</FormLabel>
              <FormControl>
                <label
                  ref={labelRef}
                  className="mb-2.5 flex w-fit cursor-pointer items-center transition-colors duration-150 ease-in-out has-[:checked]:w-full"
                >
                  <input
                    ref={inputRef}
                    type="checkbox"
                    name="lists"
                    value="create"
                    className="peer hidden"
                    onClick={handleClickInput}
                  />
                  <PlusIcon
                    fillPrimary={isChecked ? "#00e4f5" : "#d4d4d8"}
                    fillSecondary="#262626"
                  />
                  <span className="ml-1.5 select-none peer-checked:hidden">
                    Create collection
                  </span>
                  <div className="hidden peer-checked:flex peer-checked:grow peer-checked:animate-scale-to-right">
                    <input
                      {...field}
                      ref={createListRef}
                      type="text"
                      autoComplete="off"
                      className="relative ml-1 h-8 w-5/6 rounded rounded-r-none border border-r-0 border-white/5 bg-background-lighter pl-2 pr-1 text-[15px] leading-8 outline-none md:pr-2"
                    />
                    <button
                      type="submit"
                      className="h-8 overflow-x-scroll rounded rounded-bl-none rounded-tl-none border border-l-0 border-white/5 bg-background-lighter pl-1 pr-2 text-sm font-medium outline-none transition-colors duration-150 ease-in hover:text-[#00e4f5] md:pl-2"
                    >
                      Create
                    </button>
                  </div>
                </label>
              </FormControl>
              <FormDescription className="sr-only">
                This is the name of the list where you will save movies and TV
                shows.
              </FormDescription>
              <FormMessage className="ml-11 pt-2" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
