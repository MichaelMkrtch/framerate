import { useEffect, useRef } from "react";

import { type Media } from "@/types";

import ListsForm from "./ListsForm";

import { saveToList } from "@/actions/list-action";
import { BoxIcon, CheckBoxIcon } from "@/components/ui/Icons";
import { getLists, removeFromList } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

export default function Lists({ media }: { media: Media }) {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { id: mediaId, mediaType } = media;

  const { savedMedia, addMedia, removeMedia } = useListContentStore(
    (state) => ({
      savedMedia: state.savedMedia,
      addMedia: state.addMedia,
      removeMedia: state.removeMedia,
    }),
  );

  const { userLists, setLists } = useListsStore((state) => ({
    userLists: state.userLists,
    setLists: state.setLists,
    addList: state.addList,
    removeList: state.removeList,
  }));

  useEffect(() => {
    (async () => {
      const results = await getLists();
      results && setLists(results);
    })();
  }, [setLists]);

  const idList = savedMedia.map((media) => media.listId);
  console.log("idList", idList);

  function checkSavedMedia(listId: number, mediaId: number) {
    const filteredMedia = savedMedia.filter((listContent) => {
      if (listContent.mediaType === "movie") {
        return listId === listContent.listId;
      } else if (listContent.mediaType === "tv") {
        return listId === listContent.listId;
      }
    });
    return filteredMedia;
  }

  async function handleSubmit(listId: number) {
    const filteredMedia = checkSavedMedia(listId, mediaId);

    if (filteredMedia.length === 0) {
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
      console.log("adding");
      addMedia({ listId, mediaType, movieId: mediaId, seriesId: mediaId });
    }

    filteredMedia.forEach(async (media) => {
      if (media.listId === listId) {
        await removeFromList(listId, mediaId, mediaType);
        removeMedia(listId);
      }
      console.log("removing");
    });
  }

  const listContent = {
    mediaId,
    mediaType,
    idList,
  };

  return (
    <ListsForm ref={formRef} action={saveToList.bind(null, listContent)}>
      <fieldset>
        {userLists.length > 0 &&
          userLists.map((userList, index) => {
            return (
              userList && (
                <label
                  key={`${userList.name}-${index}`}
                  className="mb-2.5 flex w-fit cursor-pointer select-none items-center"
                >
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    name={`listId-${userList.id}`}
                    value={userList.id}
                    defaultChecked={idList.includes(userList.id) ? true : false}
                    onClick={() => handleSubmit(userList.id)}
                    className="peer hidden"
                  />
                  <CheckBoxIcon
                    fillPrimary="#00e4f5"
                    fillSecondary="#262626"
                    classes="hidden peer-checked:block"
                  />
                  <BoxIcon fill="#262626" classes="peer-checked:hidden" />
                  <span className="ml-1.5">{userList.name}</span>
                </label>
              )
            );
          })}
      </fieldset>
    </ListsForm>
  );
}
