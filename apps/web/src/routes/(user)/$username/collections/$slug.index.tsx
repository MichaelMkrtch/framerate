import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";
import Backdrop from "@web/features/details/components/Backdrop";
import ListDescription from "@web/features/lists/components/ListDescription";
import ListGrid from "@web/features/lists/components/ListGrid";
import SideCard from "@web/features/lists/components/SideCard";
import { scrollToTop } from "@web/lib/scroll-to-top";
import { getListData } from "@web/server/lists";
import { useActiveListStore } from "@web/store/collections/active-list-store";
import { useListItemStore } from "@web/store/collections/list-item-store";

import { ArrowLeftCircle, ArrowUp } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

export const Route = createFileRoute("/(user)/$username/collections/$slug/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username, slug } = Route.useParams();

  const [isArrowVisible, setIsArrowVisible] = useState(false);

  const scrollToTopBtn = useRef<HTMLButtonElement>(null);

  useHotkeys("t", () => {
    scrollToTopBtn.current?.click();
  });

  const setActiveList = useActiveListStore.use.setActiveList();
  const setLikeCount = useActiveListStore.use.setLikeCount();
  const setSaveCount = useActiveListStore.use.setSaveCount();
  const setIsLiked = useActiveListStore.use.setIsLiked();
  const setIsSaved = useActiveListStore.use.setIsSaved();
  const clearActiveList = useActiveListStore.use.clearActiveList();

  const setListItems = useListItemStore.use.setListItems();
  const clearListItems = useListItemStore.use.clearListItems();

  const { data: listData, isFetching } = useQuery({
    queryKey: ["list-items", username, slug],
    queryFn: () => getListData(username, slug),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isFetching) {
      if (listData) {
        setActiveList(listData.list);
        setLikeCount(listData.list.likeCount);
        setSaveCount(listData.list.saveCount);
        setIsLiked(listData.isLiked);
        setIsSaved(listData.isSaved);
        setListItems(listData.listItems);
      }

      if (!isFetching && !listData) {
        toast.error("Something went wrong while getting list data!");
      }
    }

    return () => {
      clearActiveList();
      clearListItems();
    };
  }, [
    isFetching,
    listData,
    setActiveList,
    setLikeCount,
    setSaveCount,
    setIsLiked,
    setIsSaved,
    setListItems,
    clearActiveList,
    clearListItems,
  ]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsArrowVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <main>
      <Backdrop
        collection
        backdropPath="/lvOLivVeX3DVVcwfVkxKf0R22D8.jpg"
        alt="Decorative image describing this collection."
      />
      <div className="relative -top-28 mt-10">
        <Link to="/collections">
          <ArrowLeftCircle
            size={26}
            strokeWidth={1.5}
            className="text-gray mb-6 cursor-pointer transition-colors duration-200 hover:text-white"
          />
        </Link>

        <ListDescription listData={listData} />

        <div className="flex size-full gap-2.5">
          <ListGrid listData={listData} isFetching={isFetching} />
          <SideCard listData={listData} />
        </div>
      </div>

      <TooltipProvider>
        <Tooltip side="top" sideOffset={12} content="Scroll to top" key1="T">
          <button
            ref={scrollToTopBtn}
            onClick={scrollToTop}
            className={`${isArrowVisible ? "animate-fade-in" : ""} fixed right-4 bottom-4 rounded-full p-2 shadow-lg transition-colors duration-200 outline-none hover:bg-white/5 ${
              isArrowVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUp strokeWidth={1.5} />
          </button>
        </Tooltip>
      </TooltipProvider>
    </main>
  );
}
