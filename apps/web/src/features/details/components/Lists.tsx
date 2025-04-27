import type { MediaDetails } from "@web/types/details";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useRef } from "react";

import { BoxIcon } from "@web/components/icons/BoxIcon";
import { CheckBoxIcon } from "@web/components/icons/CheckboxIcon";
import { deleteListItem, getListItems, getLists } from "@web/server/lists";
import { useAuthStore } from "@web/store/auth/auth-store";
import { useListStore } from "@web/store/collections/list-store";

import { toast } from "sonner";

type SavedToList = {
  listId: number;
  listItemId: number;
  mediaType: string;
  mediaId: number | null;
};

type ListsProps = {
  media: MediaDetails;
  savedToLists: SavedToList[];
  setSavedToLists: Dispatch<SetStateAction<SavedToList[]>>;
};

export default function Lists({
  media,
  savedToLists,
  setSavedToLists,
}: ListsProps) {
  const { username } = useAuthStore();
  const { lists, setLists, clearLists } = useListStore();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { mediaType, id: mediaId } = media;

  useEffect(() => {
    (async () => {
      const response = await getLists();

      if (response.error) {
        return toast.error(response.error.message);
      }

      setLists(response.data);
    })();
  }, [username, lists.length, setLists, clearLists]);

  async function handleClick(listId: number) {
    const matchedLists = savedToLists.filter(
      (savedList) => savedList.listId === listId,
    );

    // Clicked list does not match a list that the item is saved in (if any)
    if (matchedLists.length === 0) {
      const requestData = { listId, mediaType, mediaId };

      const response = await getListItems(requestData);

      if (response.error) {
        return toast.error(response.error.message);
      }

      const { data } = response;

      setSavedToLists((prevState) => {
        const mediaId = mediaType === "movie" ? data.movieId : data.seriesId;
        return [
          ...prevState,
          {
            listId: data.listId,
            listItemId: data.id,
            mediaType: data.mediaType,
            mediaId,
          },
        ];
      });
      return toast.success("Added to list");
    }

    // Clicked list matches a list that the item is saved in
    if (matchedLists.length > 0) {
      matchedLists.forEach(async (list) => {
        const { listItemId } = list;

        const response = await deleteListItem(listItemId);

        if (response.error) {
          return toast.error(response.error.message);
        }

        const newSavedToLists = savedToLists.filter(
          (list) => list.listId !== listId,
        );
        setSavedToLists(newSavedToLists);
        toast.success("Removed from list");
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
          className="mb-2.5 flex w-fit cursor-pointer items-center select-none"
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
