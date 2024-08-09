import { useEffect, useState } from "react";
import { toast } from "sonner";

import { type Media } from "@/types";

import CreateList from "../profile/lists/CreateList";
import Lists from "../profile/lists/Lists";
import ListsModal from "../profile/lists/ListsModal";
import { BookmarkIcon, EyeIcon, LikeIcon, PenIcon } from "../ui/Icons";
import TooltipProvider from "../ui/TooltipProvider";

import { validateRequest } from "@/lib/auth";
import { checkIfSaved } from "@/lib/lists";
import { getReview } from "@/lib/reviewCard";
import { updateLikeStatus, updateWatchStatus } from "@/lib/reviewCard";
import { useListContentStore } from "@/store/listContentStore";

export default function IconsSection({ media }: { media: Media }) {
  const [isLiked, setIsLiked] = useState<boolean | null>();
  const [isWatched, setIsWatched] = useState<boolean | null>();

  const { savedMedia, addMedia, clearMedia } = useListContentStore((state) => ({
    savedMedia: state.savedMedia,
    addMedia: state.addMedia,
    clearMedia: state.clearMedia,
  }));

  const iconClasses =
    "h-9 w-9 mx-[5px] md:h-7 md:w-7 lg:h-8 lg:w-8 transition-all duration-150 ease active:scale-90";

  const { id: mediaId, mediaType } = media;

  useEffect(() => {
    (async () => {
      const reviewResult = await getReview(mediaId, mediaType);
      if (reviewResult) {
        setIsLiked(reviewResult.liked);
        setIsWatched(reviewResult.watched);
      }
    })();
  }, [mediaType, mediaId]);

  useEffect(() => {
    (async () => {
      const listContentResults = await checkIfSaved(mediaId, mediaType);
      if (listContentResults && listContentResults.length > 0) {
        listContentResults.forEach((listContent) => addMedia(listContent));
      }
    })();
    return () => clearMedia();
  }, [mediaType, mediaId, addMedia, clearMedia]);

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
          mediaId,
          mediaType,
        });
        setIsLiked(true);
      } else {
        await updateLikeStatus({
          status: null,
          mediaId,
          mediaType,
        });
        setIsLiked(null);
      }
    } else if (icon === "watch") {
      if (isWatched === null) {
        await updateWatchStatus({
          status: true,
          mediaId,
          mediaType,
        });
        setIsWatched(true);
      } else {
        await updateWatchStatus({
          status: null,
          mediaId,
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
          classes={`${iconClasses} ${isLiked && "fill-[#FF153A]"} hover:fill-[#FF153A] cursor-pointer`}
          onClick={() => handleClick("like")}
        />
      </TooltipProvider>

      <TooltipProvider content={<p>Watched</p>}>
        <EyeIcon
          fill="#333"
          classes={`${iconClasses} ${isWatched && "fill-cyan-350"} hover:fill-cyan-350 cursor-pointer`}
          onClick={() => handleClick("watch")}
        />
      </TooltipProvider>

      <TooltipProvider content={<p>Save to list</p>}>
        <ListsModal>
          <ListsModal.Trigger asChild>
            <div>
              <BookmarkIcon
                fill="#333"
                classes={`${iconClasses} ${savedMedia.length > 0 && "fill-[#32EC44]"} hover:fill-[#32EC44] cursor-pointer`}
              />
            </div>
          </ListsModal.Trigger>

          <ListsModal.Content title="Add to list" description="Save media to one of your lists">
            <div>
              <CreateList />
              <Lists media={media} />
            </div>
          </ListsModal.Content>
        </ListsModal>
      </TooltipProvider>

      <TooltipProvider content={<p>Review</p>}>
        <PenIcon
          fill="#333"
          classes={`${iconClasses} hover:fill-[#7468F3] cursor-pointer`}
          onClick={() => handleClick}
        />
      </TooltipProvider>
    </div>
  );
}
