import { BookmarkIcon, EyeIcon, PenIcon, PlayIcon } from "../ui/Icons";
import TooltipProvider from "../ui/TooltipProvider";

export default function IconsSection() {
  const iconClasses =
    "h-8 w-8 transition-all duration-150 ease active:scale-90";

  return (
    <div className="mx-0.5 mt-12 flex justify-between">
      <TooltipProvider content={<p>Currently watching</p>}>
        <PlayIcon fill="#333" classes={`${iconClasses} hover:fill-[#FF153A]`} />
      </TooltipProvider>
      <TooltipProvider content={<p>Mark watched</p>}>
        <EyeIcon fill="#333" classes={`${iconClasses} hover:fill-cyan-350`} />
      </TooltipProvider>
      <TooltipProvider content={<p>Save to watchlist</p>}>
        <BookmarkIcon
          fill="#333"
          classes={`${iconClasses} hover:fill-[#32EC44]`}
        />
      </TooltipProvider>
      <TooltipProvider content={<p>Review</p>}>
        <PenIcon fill="#333" classes={`${iconClasses} hover:fill-[#7468F3]`} />
      </TooltipProvider>
    </div>
  );
}
