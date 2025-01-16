import type { List } from "@/types/data.types";
import type { Details } from "@/types/tmdb.types";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useRef } from "react";

import { SelectListItem } from "@/drizzle/schema";
import { toast } from "sonner";

import { useListStore } from "@/store/collections/list-store";
import { BoxIcon } from "@/components/icons/BoxIcon";
import { CheckBoxIcon } from "@/components/icons/CheckBoxIcon";

type SavedToList = {
  listId: number;
  listItemId: number;
  mediaType: string;
  mediaId: number | null;
};

type ListsProps = {
  media: Details;
  savedToLists: SavedToList[];
  setSavedToLists: Dispatch<SetStateAction<SavedToList[]>>;
};

export default function Lists({
  media,
  savedToLists,
  setSavedToLists,
}: ListsProps) {
  const { lists, setLists, clearLists } = useListStore();
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/lists");
      const data: { message: string; results: List[] } = await response.json();

      if (response.ok) {
        return setLists(data.results);
      }

      return toast.error(data.message);
    })();
  }, [lists.length, setLists, clearLists]);

  async function handleClick(listId: number) {
    const matchedLists = savedToLists.filter(
      (savedList) => savedList.listId === listId,
    );

    // Clicked list does not match a list that the item is saved in (if any)
    if (matchedLists.length === 0) {
      const response = await fetch(
        `/api/list-item/${listId}/${media.mediaType}/${media.id}`,
        {
          method: "POST",
        },
      );
      const data: { message: string; results: SelectListItem } =
        await response.json();

      if (response.ok) {
        const {
          listId,
          id: listItemId,
          mediaType,
          movieId,
          seriesId,
        } = data.results;

        setSavedToLists((prevState) => {
          const mediaId = mediaType === "movie" ? movieId : seriesId;
          return [...prevState, { listId, listItemId, mediaType, mediaId }];
        });
        return toast.success(data.message);
      }
      return toast.error(data.message);
    }

    // Clicked list matches a list that the item is saved in
    if (matchedLists.length > 0) {
      matchedLists.forEach(async (list) => {
        const { listItemId, mediaType, mediaId } = list;

        const response = await fetch(
          `/api/list-item/${listId}/${listItemId}/${mediaType}/${mediaId}`,
          {
            method: "DELETE",
          },
        );
        const data: { message: string } = await response.json();

        if (response.ok) {
          const newSavedToLists = savedToLists.filter(
            (list) => list.listId !== listId,
          );

          setSavedToLists(newSavedToLists);

          return toast.success(data.message);
        }
        return toast.error(data.message);
      });
    }
  }

  const idList = savedToLists.map((savedToLists) => savedToLists.listId);

  return (
    lists.length > 0 &&
    lists.map((list) => {
      return (
        <label
          key={list.id}
          className="mb-2.5 flex w-fit cursor-pointer select-none items-center"
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            name="listId"
            value={list.id}
            defaultChecked={idList.includes(list.id)}
            onClick={() => handleClick(list.id)}
            className="peer hidden"
          />
          <CheckBoxIcon
            fillPrimary="#00e4f5"
            fillSecondary="#262626"
            classes="hidden peer-checked:block"
          />
          <BoxIcon fill="#262626" classes="peer-checked:hidden" />
          <span className="ml-1.5">{list.name}</span>
        </label>
      );
    })
  );
}
