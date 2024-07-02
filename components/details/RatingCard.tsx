import { type Film } from "@/types";

import Card from "../ui/Card";
import { StarIcon } from "../ui/Icons";
import IconsSection from "./IconsSection";
import RatingForm from "./RatingForm";

type RatingCardProps = {
  film: Film;
};

export default function RatingCard({ film }: RatingCardProps) {
  return (
    <div className="flex items-center justify-between gap-3.5 md:block">
      <Card classes="basis-3/5 md:basis-full">
        <div className="mx-0.5 mb-6 flex items-center justify-between lg:mb-8">
          <h3 className="inline font-medium">Ratings</h3>
          <div className="flex items-center">
            <StarIcon fill="#FFD43B" classes="h-6 w-6" />
            <div className="flex flex-col pl-2">
              <p className="text-center text-sm">
                <span className="font-semibold">
                  {(Math.random() * 4.5 + 0.5).toFixed(1)}
                </span>
                <span className="font-noto font-medium"> / </span>5
              </p>
              <span className="text-sm">
                {(Math.floor(Math.random() * 100_000) / 1e3).toFixed(1)}K
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
