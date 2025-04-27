import type { MediaDetails } from "@web/types/details";

import { useEffect, useState } from "react";

import {
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  PenIcon,
} from "@web/components/icons/MediaActionIcons";
import Tooltip from "@web/components/Tooltip";
import { TooltipProvider } from "@web/components/ui/tooltip-ui";
import CreateList from "@web/features/details/components/CreateList";
import Lists from "@web/features/details/components/Lists";
import ListsModal from "@web/features/details/components/ListsModal";
// import { checkIfListItem } from "@web/features/details/server/db/list";
// import {
//   getReview,
//   updateLikeStatus,
//   updateWatchStatus,
// } from "@web/features/details/server/db/review";
import { authClient } from "@web/lib/auth-client";
import { useReviewStore } from "@web/store/details/review-store";

import { toast } from "sonner";

type SavedToList = {
  listId: number;
  listItemId: number;
  mediaType: string;
  mediaId: number | null;
};

export default function MediaActions({ media }: Record<"media", MediaDetails>) {
  const { isLiked, setIsLiked, isWatched, setIsWatched } = useReviewStore();
  const [savedToLists, setSavedToLists] = useState<SavedToList[]>([]);

  const { id: mediaId, mediaType } = media;

  // useEffect(() => {
  //   (async () => {
  //     const reviewResult = await getReview(mediaType, mediaId);
  //     if (reviewResult) {
  //       setIsLiked(reviewResult.liked);
  //       setIsWatched(reviewResult.watched);
  //     }
  //   })();

  //   return () => {
  //     setIsLiked(false);
  //     setIsWatched(false);
  //   };
  // }, [mediaType, mediaId, setIsLiked, setIsWatched]);

  // useEffect(() => {
  //   (async () => {
  //     const savedItems = await checkIfListItem(mediaId, mediaType);
  //     if (savedItems && savedItems.length > 0) {
  //       setSavedToLists(savedItems);
  //     }
  //   })();

  //   return () => setSavedToLists([]);
  // }, [mediaId, mediaType]);

  async function handleClick(icon: string) {
    const session = await authClient.getSession();

    if (!session?.data?.user) {
      toast.info("Please log in to save data");
      return;
    }

    // switch (icon) {
    //   case "like":
    //     await updateLikeStatus({
    //       status: !isLiked,
    //       mediaId,
    //       mediaType,
    //     });
    //     setIsLiked(!isLiked);
    //     break;
    //   case "watch":
    //     await updateWatchStatus({
    //       status: !isWatched,
    //       mediaId,
    //       mediaType,
    //     });
    //     setIsWatched(!isWatched);
    //     break;
    //   default:
    //     toast.error("Something went wrong! Please try again later.");
    //     break;
    // }
  }

  const actions = [
    {
      id: 1,
      name: "like",
      content: "Like",
      icon: HeartIcon,
      classes: `${isLiked && "fill-[#FF153A]"} cursor-pointer hover:fill-[#FF153A]`,
    },
    {
      id: 2,
      name: "watch",
      content: "Mark as watched",
      icon: EyeIcon,
      classes: `${isWatched && "fill-[#00e4f5]"} hover:fill-[#00e4f5]`,
    },
    {
      id: 4,
      name: "review",
      content: "Review",
      icon: PenIcon,
      classes: `hover:fill-[#7468F3] cursor-pointer`,
    },
  ];

  return (
    <div className="mt-3 flex w-full items-center justify-between gap-0 px-1.5">
      <TooltipProvider>
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Tooltip
              key={action.id}
              side="top"
              sideOffset={12}
              content={action.content}
            >
              {/* Div is necessary for tooltip to work */}
              <div>
                <Icon
                  fill="#333"
                  classes={`${action.classes} cursor-pointer ease transition-all duration-150 active:scale-90 md:h-7 lg:h-8`}
                  onClick={() => handleClick(action.name)}
                />
              </div>
            </Tooltip>
          );
        })}

        <ListsModal>
          <Tooltip side="top" sideOffset={12} content={"Save to list"}>
            <ListsModal.Trigger asChild>
              {/* Div is necessary for tooltip to work */}
              <div>
                <BookmarkIcon
                  fill="#333"
                  classes={`${savedToLists && savedToLists.length > 0 && "fill-[#32EC44]"} hover:fill-[#32EC44] h-8 cursor-pointer`}
                />
              </div>
            </ListsModal.Trigger>
          </Tooltip>

          <ListsModal.Content
            title="Update Collections"
            description="Save or remove content from your collections"
          >
            <div className="animate-fade-in">
              <CreateList />
              <Lists
                media={media}
                savedToLists={savedToLists}
                setSavedToLists={setSavedToLists}
              />
            </div>
          </ListsModal.Content>
        </ListsModal>
      </TooltipProvider>
    </div>
  );
}
