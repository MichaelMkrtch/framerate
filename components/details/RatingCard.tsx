import Card from "../ui/Card";
import {
  BookmarkIcon,
  EyeIcon,
  PenIcon,
  PlayIcon,
  StarIcon,
} from "../ui/Icons";
import StarRating from "../ui/StarRating";

export default function RatingCard() {
  const iconClasses =
    "h-8 w-8 transition-colors duration-150 ease-out hover:fill-[#5C5C5C]";

  return (
    <>
      <Card>
        <div className="mx-0.5 mb-6 flex items-center justify-between">
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
        <div className="mx-0.5 mt-10 flex justify-between">
          <PlayIcon fill="#333" classes={iconClasses} />
          <EyeIcon fill="#333" classes={iconClasses} />
          <BookmarkIcon fill="#333" classes={iconClasses} />
          <PenIcon fill="#333" classes={iconClasses} />
        </div>
      </Card>
    </>
  );
}
