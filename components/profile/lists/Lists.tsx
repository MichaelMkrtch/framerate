import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { type Media } from "@/types";

import ListsForm from "./ListsForm";

import { saveToList } from "@/actions/list-action";
import { BoxIcon, CheckBoxIcon } from "@/components/ui/Icons";
import { getLists, removeFromList } from "@/lib/lists";
import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

type FormRefs = { [key: number]: { current: HTMLFormElement | null } };

export default function Lists({ media }: { media: Media }) {
  const formRefs = useRef<FormRefs>({});
  const checkboxRef = useRef<HTMLInputElement>(null);

  const { listContent, removeListContent } = useListContentStore((state) => ({
    listContent: state.listContent,
    removeListContent: state.removeListContent,
  }));

  const { userLists, setLists } = useListsStore((state) => ({
    userLists: state.userLists,
    setLists: state.setLists,
  }));

  useEffect(() => {
    (async () => {
      if (userLists.length === 0) {
        const results = await getLists();
        results && setLists(results);
      }
    })();
  }, [userLists, setLists]);

  const idList = listContent.map((media) => media.listId);

  async function handleSubmit(listId: number, index: number) {
    if (!idList.includes(listId)) {
      formRefs.current[index].current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }

    if (idList.includes(listId)) {
      idList.forEach(async (id) => {
        if (id === listId) {
          const contentToRemove = listContent.filter(
            (content) =>
              content.listId === listId && content.mediaId === media.id,
          );
          await removeFromList(
            contentToRemove[0].listContentId,
            media.id,
            media.mediaType,
          );
          removeListContent(
            media.id,
            contentToRemove[0].listContentId,
            media.mediaType,
          );
        }
      });

      toast.success("Removed from list");
    }
  }

  return (
    <>
      {userLists.length > 0 &&
        userLists.map((userList, index) => {
          return (
            userList && (
              <ListsForm
                key={`${userList.name}-${index}`}
                ref={(formRefs.current[index] ??= { current: null })}
                action={saveToList.bind(null, media)}
              >
                <label className="mb-2.5 flex w-fit cursor-pointer select-none items-center">
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    name="listId"
                    value={userList.id}
                    defaultChecked={idList.includes(userList.id) ? true : false}
                    onClick={() => handleSubmit(userList.id, index)}
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
              </ListsForm>
            )
          );
        })}
    </>
  );
}
