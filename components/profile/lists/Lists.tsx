import { useState } from "react";

import { AddIcon, BoxIcon, CheckBoxIcon } from "@/components/ui/Icons";

export default function Lists() {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheckbox() {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }

  return (
    <>
      <div className="flex w-fit cursor-pointer items-center">
        <AddIcon fillPrimary="#d4d4d8" fillSecondary="#262626" />
        <span className="ml-1.5">Create list</span>
      </div>
      <div className="flex w-fit cursor-pointer items-center">
        <button onClick={toggleCheckbox}>
          {isChecked ? (
            <CheckBoxIcon fillPrimary="#00e4f5" fillSecondary="#262626" />
          ) : (
            <BoxIcon fill="#262626" />
          )}
        </button>
        <span className="ml-1.5">Watchlist</span>
      </div>
    </>
  );
}
