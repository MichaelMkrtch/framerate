import { type Media } from "@/types";

import getIcon from "@/utils/getIcon";

import Card from "../ui/Card";
import IconsSection from "./IconsSection";
import RatingForm from "./RatingForm";

import { StoredRating } from "@/app/film/[filmID]/[filmSlug]/page";

type RatingCardProps = {
  media: Media;
  storedRating: StoredRating | undefined;
};

export default function RatingCard({ media, storedRating }: RatingCardProps) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const icon = media && getIcon(media.title);
  const isStoredReview = storedRating && storedRating.reviewCount > 0;

  return (
    <div className="flex items-center justify-between gap-3.5 md:block">
      <Card classes="basis-3/5 md:basis-full">
        <div className="mx-[3px] mb-6 flex items-center justify-between lg:mb-8">
          <h3
            className={`${!isStoredReview ? "m-auto" : ""} inline font-medium`}
          >
            {isStoredReview
              ? "Ratings"
              : storedRating && "Leave the first review!"}
          </h3>
          <div className="flex items-center">
            {isStoredReview && icon}
            <div className="flex h-[40.5px] flex-col text-nowrap pl-2.5">
              {isStoredReview && (
                <p className="text-center text-sm">
                  <span className="font-semibold">
                    {storedRating?.avgRating &&
                      parseFloat(storedRating.avgRating.toFixed(2))}
                  </span>
                  <span className="font-noto font-medium"> / </span>5
                </p>
              )}
              <span className="text-sm">
                {isStoredReview
                  ? formatter.format(storedRating.reviewCount)
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <RatingForm media={media} />
        <div className="hidden md:block">
          <IconsSection id={media.id} mediaType={media.mediaType} />
        </div>
      </Card>

      <Card classes="md:hidden basis-2/5 h-[124.5px]">
        <IconsSection id={media.id} mediaType={media.mediaType} />
      </Card>
    </div>
  );
}
