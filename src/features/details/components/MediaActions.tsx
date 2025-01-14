import type { Details } from "@/types/tmdb.types";

import { useEffect } from "react";

import { toast } from "sonner";

import { useReviewStore } from "@/store/details/review-store";
import {
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  PenIcon,
} from "@/components/icons/MediaActionIcons";
import Tooltip from "@/components/Tooltip";
import { TooltipProvider } from "@/components/ui/tooltip-ui";
import { authClient } from "@/lib/auth-client";
import {
  getReview,
  updateLikeStatus,
  updateWatchStatus,
} from "../server/db/review";

export default function MediaActions({ media }: Record<"media", Details>) {
  const { isLiked, setIsLiked, isWatched, setIsWatched } = useReviewStore();

  const { id: mediaId, mediaType } = media;

  useEffect(() => {
    (async () => {
      const reviewResult = await getReview(mediaType, mediaId);
      if (reviewResult) {
        setIsLiked(reviewResult.liked);
        setIsWatched(reviewResult.watched);
      }
    })();

    return () => {
      setIsLiked(false);
      setIsWatched(false);
    };
  }, [mediaType, mediaId, setIsLiked, setIsWatched]);

  async function handleClick(icon: string) {
    const session = await authClient.getSession();

    if (!session?.data?.user) {
      toast.info("Please log in to save data");
      return;
    }

    switch (icon) {
      case "like":
        await updateLikeStatus({
          status: !isLiked,
          mediaId,
          mediaType,
        });
        setIsLiked(!isLiked);
        break;
      case "watch":
        await updateWatchStatus({
          status: !isWatched,
          mediaId,
          mediaType,
        });
        setIsWatched(!isWatched);
        break;
      default:
        break;
    }
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
      id: 3,
      name: "list",
      content: "Save to list",
      icon: BookmarkIcon,
      classes: `${[].length > 0 && "fill-[#32EC44]"} hover:fill-[#32EC44]`,
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
    <div className="mt-3 flex w-full items-center justify-evenly">
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
              <div>
                <Icon
                  fill="#333"
                  classes={`${action.classes} cursor-pointer ease mx-[5px] h-9 w-9 transition-all duration-150 active:scale-90 md:h-7 md:w-7 lg:h-8 lg:w-8`}
                  onClick={() => handleClick(action.name)}
                />
              </div>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
