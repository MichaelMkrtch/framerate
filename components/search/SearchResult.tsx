import { type Film } from "@/types";
import Image from "next/image";
import { type ReactNode } from "react";

interface SearchResult extends Film {
  children: ReactNode;
}

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

export default function SearchResult({
  id,
  title,
  directorList,
  release_date,
  poster_path,
  backdrops,
  children,
}: SearchResult) {
  const releaseYear = release_date.slice(0, 4);

  const poster = (
    <Image
      src={`${IMG_BASE_URL}w92${poster_path}`}
      alt={`A poster from the film ${title}`}
      width={92}
      height={138}
      className="h-12 w-8 rounded"
    />
  );

  const gradient = (
    <div className="h-12 w-8 rounded bg-gradient-to-tr from-indigo-600 to-rose-600" />
  );

  return (
    <div className="first:!bg-cyan-350/80 hover:bg-gray-750/40 mt-1.5 flex items-center justify-start rounded-md py-2">
      <button className="flex w-full cursor-default items-center outline-none">
        <div className="pointer-events-none flex mr-1.5 px-2">
          {poster_path ? poster : gradient}
        </div>
        <div className="flex items-baseline text-left">
          <p>
            {children} ({releaseYear})
          </p>
        </div>
      </button>
    </div>
  );
}
