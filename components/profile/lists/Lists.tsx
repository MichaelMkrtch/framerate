import CreateList from "./CreateList";

import { BoxIcon, CheckBoxIcon } from "@/components/ui/Icons";

export default function Lists() {
  const userLists = ["Favorites"];

  return (
    <fieldset>
      <CreateList />
      {userLists.map((listName, index) => {
        return (
          <label
            key={`${listName}-${index}`}
            className="flex w-fit cursor-pointer select-none items-center"
          >
            <input
              type="checkbox"
              name="lists"
              value={listName}
              className="peer hidden"
            />
            <CheckBoxIcon
              fillPrimary="#00e4f5"
              fillSecondary="#262626"
              classes="hidden peer-checked:block"
            />
            <BoxIcon fill="#262626" classes="peer-checked:hidden" />
            <span className="ml-1.5">{listName}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
