"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ListItem } from "@/types/data.types";
import { ArrowLeftCircle, ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import Backdrop from "@/components/Backdrop";
import PosterGrid from "@/components/PosterGrid";

export default function CollectionPage() {
  const { username, collectionName: listName } = useParams<{
    username: string;
    collectionName: string;
  }>();

  const { activeList, setActiveList } = useListStore();
  const { listItems, setListItems, clearListItems } = useListItemStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/michael/collections/${listName}`);
      const data: {
        message: string;
        results: { listName: string; listItems: ListItem[] };
      } = await response.json();

      if (response.ok) {
        setActiveList(data.results.listName);
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

  const scrollToTop = () => {
    const duration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(0, start * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

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
            // onClick={() => router.back()}
          />
        </Link>
        <>
          <h2 className="mb-1 h-7 text-xl font-bold">{activeList?.name}</h2>
          <h3 className="mb-8 font-medium text-gray">
            Collection by{" "}
            <Link
              href={`/${username}`}
              className="font-bold opacity-100 transition-colors duration-200 hover:text-foreground"
            >
              {username}
            </Link>
          </h3>
        </>
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
