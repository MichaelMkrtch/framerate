import { type Film } from "@/types";
import { type ReactNode } from "react";

interface SearchResult extends Film {
  children: ReactNode;
}

export default function SearchResult({
  id,
  title,
  directorList,
  releaseDate,
  posterPath,
  backdrops,
  children,
}: SearchResult) {
  
  return (
    <div className="first:!bg-cyan-350/80 hover:bg-gray-750/40 mt-1.5 flex items-center justify-start rounded-md py-2">
      <button className="flex w-full cursor-default items-center outline-none">
        <div className="flex items-baseline text-left">
          <p>
            {children} ({releaseDate})
          </p>
        </div>
      </button>
    </div>
  );
}
