"use client";

import type { Dispatch, SetStateAction } from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ActiveList, ListItem } from "@/types/data.types";
import { ArrowLeftCircle, ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import Backdrop from "@/components/Backdrop";
import PosterGrid from "@/components/PosterGrid";
import { formatElapsedTime, scrollToTop } from "@/lib/utils";

export default function CollectionPage() {
  const { username, collectionName: listName } = useParams<{
    username: string;
    collectionName: string;
  }>();

  const { activeList, setActiveList } = useListStore();
  const { listItems, setListItems, clearListItems } = useListItemStore();

  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/michael/collections/${listName}`);
      const data: {
        message: string;
        results: {
          list: { listName: string; createdAt: Date; updatedAt: Date };
          listItems: ListItem[];
        };
      } = await response.json();

      if (response.ok) {
        setActiveList(data.results.list);
        setListItems(data.results.listItems);
        return;
      }
      return toast.error(data.message);
    })();

    return () => {
      clearListItems();
    };
  }, [username, listName, setListItems, setActiveList, clearListItems]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
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
          <h2 className="mb-2 h-7 text-xl font-bold">{activeList?.listName}</h2>
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
            {displayText(hovering, setHovering, activeList)}
          </p>
        </div>

        {listItems.length > 0 && (
          <div className="rounded-md border border-white/10 bg-background-darker px-7 py-8">
            <PosterGrid media={listItems} isTooltipEnabled={false} />
          </div>
        )}
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
    </>
  );
}

function displayText(
  hovering: boolean,
  setHovering: Dispatch<SetStateAction<boolean>>,
  activeList: ActiveList | null,
) {
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
