import { type Film } from "@/types";

import getIcon from "@/utils/getIcon";

import Card from "../ui/Card";
import { DeathStarIcon, StarIcon } from "../ui/Icons";
import IconsSection from "./IconsSection";
import RatingForm from "./RatingForm";

import { StoredRating } from "@/app/film/[filmID]/[filmSlug]/page";

type RatingCardProps = {
  film: Film;
  storedRating: StoredRating | undefined;
};

export default function RatingCard({ film, storedRating }: RatingCardProps) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const icon = film && getIcon(film.title);
  const isStoredReview = storedRating && storedRating.reviewCount > 0;

  return (
    <div className="flex items-center justify-between gap-3.5 md:block">
      <Card classes="basis-3/5 md:basis-full">
        <div className="mx-0.5 mb-6 flex items-center justify-between lg:mb-8">
          <h3 className="inline font-medium">
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
        <RatingForm film={film} />
        <div className="hidden md:block">
          <IconsSection />
        </div>
      </Card>

      <Card classes="md:hidden basis-2/5 h-[124.5px]">
        <IconsSection />
      </Card>
    </div>
  );
}
