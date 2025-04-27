import type { MediaDetails } from "@web/types/details";
import type { List } from "@web/types/lists";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useRef } from "react";

import { BoxIcon } from "@web/components/icons/BoxIcon";
import { CheckBoxIcon } from "@web/components/icons/CheckboxIcon";
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

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/${username}/collections`);
  //     const data: { message: string; results: List[] } = await response.json();

  //     if (response.ok) {
  //       return setLists(data.results);
  //     }

  //     return toast.error(data.message);
  //   })();
  // }, [username, lists.length, setLists, clearLists]);

  async function handleClick(listId: number) {
    const matchedLists = savedToLists.filter(
      (savedList) => savedList.listId === listId,
    );

    // Clicked list does not match a list that the item is saved in (if any)
    //   if (matchedLists.length === 0) {
    //     const requestData = { listId, mediaType, mediaId };

    //     const response = await fetch(`/api/list-items`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(requestData),
    //     });
    //     const data: { message: string; results: SelectListItem } =
    //       await response.json();

    //     if (response.ok) {
    //       const {
    //         listId,
    //         id: listItemId,
    //         mediaType,
    //         movieId,
    //         seriesId,
    //       } = data.results;

    //       setSavedToLists((prevState) => {
    //         const mediaId = mediaType === "movie" ? movieId : seriesId;
    //         return [...prevState, { listId, listItemId, mediaType, mediaId }];
    //       });
    //       return toast.success(data.message);
    //     }
    //     return toast.error(data.message);
    //   }

    //   // Clicked list matches a list that the item is saved in
    //   if (matchedLists.length > 0) {
    //     matchedLists.forEach(async (list) => {
    //       const { listItemId } = list;

    //       const response = await fetch(`/api/list-items/${listItemId}`, {
    //         method: "DELETE",
    //       });
    //       const data: { message: string } = await response.json();

    //       if (response.ok) {
    //         const newSavedToLists = savedToLists.filter(
    //           (list) => list.listId !== listId,
    //         );

    //         setSavedToLists(newSavedToLists);

    //         return toast.success(data.message);
    //       }
    //       return toast.error(data.message);
    //     });
    //   }
    // }

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
}
