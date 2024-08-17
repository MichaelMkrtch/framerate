import { type ChangeEvent, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import ListsForm from "./ListsForm";

import { submitList } from "@/actions/list-action";
import { AddIcon } from "@/components/ui/Icons";

export default function CreateList() {
  const [isChecked, setIsChecked] = useState<boolean | undefined>();
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const createListRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleClickInput() {
    setIsChecked(inputRef.current?.checked);
    createListRef.current?.focus();
  }

  function handleClickCreateList() {
    if (inputRef.current?.checked) {
      inputRef.current.checked = false;
      setIsChecked(false);
    }
  }

  useOnClickOutside(labelRef, handleClickCreateList);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUserInput(event?.target.value);
  }

  return (
    <ListsForm action={submitList} ref={formRef}>
      <label
        ref={labelRef}
        className="mb-2.5 flex w-fit cursor-pointer items-center has-[:checked]:w-5/6 hover:text-zinc-50 transition-colors duration-150 ease-in-out"
      >
        <input
          ref={inputRef}
          type="checkbox"
          name="lists"
          value="create"
          className="peer hidden"
          onClick={handleClickInput}
        />
        <AddIcon
          fillPrimary={isChecked ? "#00e4f5" : "#d4d4d8"}
          fillSecondary="#262626"
        />
        <span className="ml-1.5 select-none peer-checked:hidden">
          Create list
        </span>
        <div className="hidden peer-checked:flex peer-checked:grow peer-checked:animate-scale-to-right peer-checked:items-center">
          <input
            ref={createListRef}
            type="text"
            name="listName"
            value={userInput}
            onChange={(event) => handleChange(event)}
            className="relative ml-1 h-[32px] w-full rounded bg-neutral-800 px-2 outline-none ring-1 ring-white/10"
          />
          <button
            type="submit"
            className="absolute right-0 h-full overflow-x-scroll rounded bg-neutral-800 px-1.5 pr-2.5 text-sm font-medium text-zinc-200 transition-colors duration-150 ease-in hover:text-cyan-350"
            onClick={handleClickCreateList}
          >
            Create
          </button>
        </div>
      </label>
    </ListsForm>
  );
}
