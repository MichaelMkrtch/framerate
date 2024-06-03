import Card from "../ui/Card";
import { StarIcon } from "../ui/Icons";
import StarRating from "../ui/StarRating";
import IconsSection from "./IconsSection";

export default function RatingCard() {
  return (
    <>
      <Card>
        <div className="mx-0.5 mb-8 flex items-center justify-between">
          <h3 className="inline font-medium">Ratings</h3>
          <div className="flex items-center">
            <StarIcon fill="#FFD43B" classes="h-6 w-6" />
            <div className="flex flex-col pl-2">
              <p className="text-center">
                <span className="font-semibold">
                  {(Math.random() * 4.5 + 0.5).toFixed(1)}
                </span>
                <span className="font-noto font-medium"> / </span>5
              </p>
              <span className="text-sm">13k</span>
            </div>
          </div>
        </div>
        <StarRating />
        <IconsSection />
      </Card>
    </>
  );
}
