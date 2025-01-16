"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeftCircle, ArrowUp } from "lucide-react";

import { useListItemStore } from "@/store/collections/list-item-store";
import { useListStore } from "@/store/collections/list-store";
import Backdrop from "@/components/Backdrop";
import PosterGrid from "@/components/PosterGrid";
import { getListItems } from "@/features/collections/server/db/list";

export default function CollectionPage() {
  const router = useRouter();
  const { username } = useParams<{
    username: string;
  }>();

  const [isVisible, setIsVisible] = useState(false);

  const { activeList } = useListStore();
  const { listItems, setListItems, clearListItems } = useListItemStore();

  useEffect(() => {
    (async () => {
      if (activeList) {
        const listItems = await getListItems(username, activeList.id);
        if (listItems) setListItems(listItems);
      }
    })();

    return () => {
      clearListItems();
    };
  }, [activeList, username, setListItems, clearListItems]);

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
        backdropPath="..."
      />
      <div className="relative -top-28 mt-10">
        <ArrowLeftCircle
          size={26}
          strokeWidth={1.5}
          className="mb-6 cursor-pointer text-gray transition-colors duration-200 hover:text-white"
          onClick={() => router.back()}
        />
        <h2 className="mb-1 text-xl font-bold">{activeList?.name}</h2>
        <h3 className="mb-8 font-medium text-gray">
          Collection by{" "}
          <Link
            href={`/${username}`}
            className="font-bold opacity-100 transition-colors duration-200 hover:text-foreground"
          >
            {username}
          </Link>
        </h3>
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
