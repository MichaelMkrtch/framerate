import type { RefObject } from "react";

import { useRef, useState } from "react";

import { PlusIcon } from "@web/components/icons/PlusIcon";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { listSchema } from "@web/features/details/schema/list";
import { createList } from "@web/server/lists";
import { useListStore } from "@web/store/collections/list-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

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

    const data = await createList(parsed.data.listName);

    if ("list" in data) {
      addList(data);
      toggleCreateList();
      return toast.success("List created successfully");
    } else {
      return toast.error("Failed to create list. Please try again later.");
    }
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
                  <div className="peer-checked:animate-scale-to-right hidden peer-checked:flex peer-checked:grow">
                    <input
                      {...field}
                      ref={createListRef}
                      type="text"
                      autoComplete="off"
                      className="bg-background-lighter relative ml-1 h-8 w-5/6 rounded rounded-r-none border border-r-0 border-white/5 pr-1 pl-2 text-[15px] leading-8 outline-none md:pr-2"
                    />
                    <button
                      type="submit"
                      className="bg-background-lighter h-8 overflow-x-scroll rounded rounded-tl-none rounded-bl-none border border-l-0 border-white/5 pr-2 pl-1 text-sm font-medium transition-colors duration-150 ease-in outline-none hover:text-[#00e4f5] md:pl-2"
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
              <FormMessage className="ml-11 pt-2 text-balance text-red-500" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
