"use client";

import type { ActiveList, List, ListItem } from "@/types/data.types";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeftCircle, ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { useActiveListStore } from "@/store/collections/active-list-store";
import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import Backdrop from "@/components/Backdrop";
import { BookmarkIcon, HeartIcon } from "@/components/icons/MediaActionIcons";
import PosterGrid from "@/components/PosterGrid";
import Dialog from "@/features/collections/components/Dialog";
import { formatElapsedTime, scrollToTop } from "@/lib/utils";

export default function CollectionPage({
  username,
  listSlug,
}: {
  username: string;
  listSlug: string;
}) {
  const router = useRouter();

  const {
    activeList,
    likeCount,
    saveCount,
    isLiked,
    isSaved,
    setActiveList,
    setLikeCount,
    setSaveCount,
    setIsLiked,
    setIsSaved,
  } = useActiveListStore();
  const { removeList } = useListStore();
  const { listItems, setListItems, clearListItems } = useListItemStore();

  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${username}/collections/${listSlug}`);
      const data: {
        message: string;
        results: {
          list: List;
          isLiked: boolean;
          isSaved: boolean;
          listItems: ListItem[];
        };
      } = await response.json();

      if (response.ok) {
        await fetch(`/api/actions/collections/view`, {
          method: "POST",
          body: JSON.stringify({ listId: data.results.list.id }),
        });

        setActiveList(data.results.list);
        setLikeCount(data.results.list.likeCount);
        setSaveCount(data.results.list.saveCount);
        setIsLiked(data.results.isLiked);
        setIsSaved(data.results.isSaved);
        setListItems(data.results.listItems);
        return;
      }
      return toast.error(data.message);
    })();

    return () => {
      setIsLiked(false);
      setIsSaved(false);
      setLikeCount(0);
      setSaveCount(0);
      clearListItems();
    };
  }, [
    username,
    listSlug,
    setListItems,
    setActiveList,
    setLikeCount,
    setSaveCount,
    setIsLiked,
    setIsSaved,
    clearListItems,
  ]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  // Pass updated like count to zustand store so UI updates correctly
  // Get initial like count with list data request and save it in activeList
  async function updateLike() {
    if (!isLiked) {
      const response = await fetch("/api/actions/collections/like", {
        method: "POST",
        body: JSON.stringify({ listId: activeList?.id }),
      });
      const data: { message: string; results: { likeCount: number } } =
        await response.json();

      if (response.ok) {
        setLikeCount(data.results.likeCount);
        return setIsLiked(true);
      }

      return toast.error(data.message);
    }

    const response = await fetch(
      `/api/actions/collections/like?id=${activeList?.id}`,
      {
        method: "DELETE",
      },
    );
    const data: { message: string; results: { likeCount: number } } =
      await response.json();

    if (response.ok) {
      setLikeCount(data.results.likeCount);
      return setIsLiked(false);
    }

    return toast.error(data.message);
  }

  async function updateSave() {
    if (!isSaved) {
      const response = await fetch("/api/actions/collections/save", {
        method: "POST",
        body: JSON.stringify({ listId: activeList?.id }),
      });
      const data: { message: string; results: { saveCount: number } } =
        await response.json();

      if (response.ok) {
        setSaveCount(data.results.saveCount);
        return setIsSaved(true);
      }

      return toast.error(data.message);
    }

    const response = await fetch(
      `/api/actions/collections/save?id=${activeList?.id}`,
      {
        method: "DELETE",
      },
    );
    const data: { message: string; results: { saveCount: number } } =
      await response.json();

    if (response.ok) {
      setSaveCount(data.results.saveCount);
      return setIsSaved(false);
    }

    return toast.error(data.message);
  }

  async function handleDelete() {
    if (activeList) {
      const response = await fetch(
        `/api/${username}/collections/${listSlug}?id=${activeList.id}`,
        {
          method: "DELETE",
        },
      );
      const data: { message: string } = await response.json();

      if (response.ok) {
        removeList(activeList.id);
        router.replace("/collections");
        return toast.success(data.message);
      }

      toast.error(data.message);
    }
  }

  return (
    <main>
      <Backdrop
        collection
        alt="Decorative image describing this collection."
        backdropPath="/lvOLivVeX3DVVcwfVkxKf0R22D8.jpg"
      />
      <div className="relative -top-28 mt-10">
        <Link href="/collections">
          <ArrowLeftCircle
            size={26}
            strokeWidth={1.5}
            className="mb-6 cursor-pointer text-gray transition-colors duration-200 hover:text-white"
          />
        </Link>

        <div className="mb-8">
          <h2 className="mb-2 h-7 text-xl font-bold">{activeList?.name}</h2>
          <h3 className="mb-0.5 font-medium text-gray">
            Collection by{" "}
            <Link
              href={`/${username}`}
              className="font-bold opacity-100 transition-colors duration-200 hover:text-foreground"
            >
              {username}
            </Link>
          </h3>

          <p
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="text-medium relative h-5 w-fit cursor-default text-sm text-gray"
          >
            {displayText(hovering, activeList)}
          </p>
        </div>

        <div className="grid w-full grid-cols-[1000px,1fr] gap-2.5">
          <div
            className={`${listItems.length > 0 && "border border-white/10 bg-background-darker"} rounded-md px-7 py-8`}
          >
            {listItems.length > 0 && (
              <PosterGrid
                media={listItems}
                isTooltipEnabled={false}
                classes="grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3.5"
              />
            )}
          </div>
          <aside className="relative flex h-fit grow flex-col items-center justify-between rounded border border-white/5 bg-background-lighter px-7 py-8 shadow-md">
            <div className="mb-6 flex gap-3">
              <Link
                href={`/${username}/collections/${listSlug}/edit`}
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
                    <Dialog.Cancel className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground">
                      Cancel
                    </Dialog.Cancel>
                    <Dialog.Action
                      onClick={handleDelete}
                      className="border-red-800 bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </Dialog.Action>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </div>

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
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`${isVisible ? "animate-fade-in" : ""} fixed bottom-4 right-4 rounded-full p-2 shadow-lg transition-colors duration-200 hover:bg-white/5 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp strokeWidth={1.5} />
      </button>
    </main>
  );
}

function displayText(hovering: boolean, activeList: ActiveList | null) {
  let elapsedCreateTime = "";
  let elapsedUpdateTime = "";

  try {
    if (activeList?.updatedAt && !elapsedUpdateTime) {
      const updatedAt = formatElapsedTime(activeList.updatedAt);
      elapsedUpdateTime = updatedAt;
    }

    if (activeList?.createdAt && !elapsedCreateTime) {
      const createdAt = formatElapsedTime(activeList.createdAt);
      elapsedCreateTime = createdAt;
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Something went wrong while calculating elapsed time!");
    }
  }

  if (hovering && elapsedUpdateTime) {
    return `Published ${elapsedCreateTime} ago`;
  }

  if (elapsedUpdateTime) {
    return `Updated ${elapsedUpdateTime} ago`;
  }

  if (!elapsedUpdateTime) {
    return `Published ${elapsedCreateTime} ago`;
  }
}
