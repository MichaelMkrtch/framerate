import { Link } from "@tanstack/react-router";

import Dialog from "@web/components/Dialog";
import {
  BookmarkIcon,
  HeartIcon,
} from "@web/components/icons/MediaActionIcons";
import { authClient } from "@web/lib/auth-client";
import { Route as CollectionPageRoute } from "@web/routes/(user)/$username/collections/$slug.index";
import { useActiveListStore } from "@web/store/collections/active-list-store";

export default function SideCard() {
  const { username, slug } = CollectionPageRoute.useParams();

  const activeUser = authClient.useSession();

  const activeList = useActiveListStore.use.activeList();
  const likeCount = useActiveListStore.use.likeCount();
  const saveCount = useActiveListStore.use.saveCount();
  const isLiked = useActiveListStore.use.isLiked();
  const isSaved = useActiveListStore.use.isSaved();

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  function updateLike() {
    console.log("like");
  }

  function updateSave() {
    console.log("save");
  }

  function handleDelete() {
    console.log("deleted");
  }

  return (
    <aside className="bg-background relative flex h-fit grow flex-col items-center justify-between rounded-md border border-white/5 px-7 py-8 shadow-md">
      {activeUser && activeList?.userId === activeUser.data?.user.id && (
        <div className="mb-6 flex gap-3">
          <Link
            to="/$username/collections/$slug/edit"
            params={{ username, slug }}
            className="transiton-colors ease rounded-md border border-white/5 bg-[#28292d] px-4 py-2 font-medium duration-150 hover:border-white/10 hover:bg-transparent"
          >
            Edit
          </Link>
          <Dialog>
            <Dialog.Trigger asChild>
              <button className="ease rounded-md border border-white/5 bg-[#28292d] px-4 py-2 font-medium transition-colors duration-150 hover:border-red-500 hover:bg-transparent">
                Delete
              </button>
            </Dialog.Trigger>
            <Dialog.Content
              title="Delete this list?"
              description="This action cannot be undone. This will permanently delete your
                      list and its content, including metadata such as likes, saves, and views."
            >
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <button className="hover:text-foreground text-foreground border-background-lighter hover:bg-background-lighter inline-flex h-9 cursor-pointer items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium transition-colors">
                    Cancel
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button
                    onClick={handleDelete}
                    className="text-foreground inline-flex h-9 cursor-pointer items-center justify-center rounded-md border-red-800 bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700"
                  >
                    Delete
                  </button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      )}

      <div className="flex w-full items-center justify-around gap-3 text-[#555]">
        <div className="flex items-center justify-center gap-2">
          <HeartIcon
            fill="#333"
            classes={`${isLiked && "fill-[#FF153A]"} hover:fill-[#FF153A] cursor-pointer ease transition-all duration-150 active:scale-90 h-6`}
            onClick={() => updateLike()}
          />
          <p className="cursor-default">{formatter.format(likeCount)}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <BookmarkIcon
            fill="#333"
            classes={`${isSaved && "fill-[#32EC44]"} hover:fill-[#32EC44] cursor-pointer ease transition-all duration-150 active:scale-90 h-6`}
            onClick={() => updateSave()}
          />
          <p className="cursor-default">{formatter.format(saveCount)}</p>
        </div>
      </div>
    </aside>
  );
}
