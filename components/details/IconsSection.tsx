import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BookmarkIcon, EyeIcon, LikeIcon, PenIcon } from "../ui/Icons";
import TooltipProvider from "../ui/TooltipProvider";

import { validateRequest } from "@/lib/auth";
import { getReview } from "@/lib/reviewCard";
import { updateLikeStatus, updateWatchStatus } from "@/lib/reviewCard";

type IconsSectionProps = {
  id: number;
  mediaType: string;
};

export default function IconsSection({ id, mediaType }: IconsSectionProps) {
  const [isLiked, setIsLiked] = useState<boolean | null>();
  const [isWatched, setIsWatched] = useState<boolean | null>();

  const iconClasses =
    "h-9 w-9 mx-[5px] md:h-7 md:w-7 lg:h-8 lg:w-8 transition-all duration-150 ease active:scale-90";

  useEffect(() => {
    (async () => {
      const result = await getReview(id, mediaType);
      if (result) {
        setIsLiked(result.liked);
        setIsWatched(result.watched);
      }
    })();
  }, [id, mediaType]);

  async function handleClick(icon: string) {
    const result = await validateRequest();

    if (!result.user) {
      toast.info("Please log in to save data");
      return;
    }

    if (icon === "like") {
      if (isLiked === null) {
        await updateLikeStatus({
          status: true,
          userId: result.user.id,
          mediaId: id,
          mediaType,
        });
        setIsLiked(true);
      } else {
        await updateLikeStatus({
          status: null,
          userId: result.user.id,
          mediaId: id,
          mediaType,
        });
        setIsLiked(null);
      }
    } else if (icon === "watch") {
      if (isWatched === null) {
        await updateWatchStatus({
          status: true,
          userId: result.user.id,
          mediaId: id,
          mediaType,
        });
        setIsWatched(true);
      } else {
        await updateWatchStatus({
          status: null,
          userId: result.user.id,
          mediaId: id,
          mediaType,
        });
        setIsWatched(null);
      }
    }
  }

  return (
    <div className="-mx-0.5 flex h-full w-full flex-wrap items-center justify-evenly md:mt-9 md:basis-full lg:mt-12">
      <TooltipProvider content={<p>Like</p>}>
        <LikeIcon
          fill="#333"
          classes={`${iconClasses} ${isLiked && "fill-[#FF153A]"} hover:fill-[#FF153A]`}
          onClick={() => handleClick("like")}
        />
      </TooltipProvider>
      <TooltipProvider content={<p>Watched</p>}>
        <EyeIcon
          fill="#333"
          classes={`${iconClasses} ${isWatched && "fill-cyan-350"} hover:fill-cyan-350`}
          onClick={() => handleClick("watch")}
        />
      </TooltipProvider>
      <TooltipProvider content={<p>Save to list</p>}>
        <BookmarkIcon
          fill="#333"
          classes={`${iconClasses} hover:fill-[#32EC44]`}
          onClick={() => handleClick}
        />
      </TooltipProvider>
      <TooltipProvider content={<p>Review</p>}>
        <PenIcon
          fill="#333"
          classes={`${iconClasses} hover:fill-[#7468F3]`}
          onClick={() => handleClick}
        />
      </TooltipProvider>
    </div>
  );
}
