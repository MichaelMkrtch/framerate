import Image from "next/image";
import { type ReactNode } from "react";

import { type Film } from "@/types";

interface SearchResult extends Film {
  renderIndex: number;
  selectedIndex: number;
  children: ReactNode;
}

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

function assignClasses(renderIndex: number, selectedIndex: number) {
  let classes =
    "first:!bg-cyan-350/80 hover:bg-gray-750/40 mt-1.5 flex items-center justify-start rounded-md py-2";

  if (selectedIndex > 0)
    classes = classes.replace("first:!bg-cyan-350/80", "first:bg-transparent");

  if (selectedIndex === renderIndex)
    classes +=
      " !bg-cyan-350/80 text-gray-850 [&_>button>div>span]:text-gray-850/60 font-medium";

  return classes;
}

export default function SearchResult({
  id,
  title,
  directorList,
  release_date,
  poster_path,
  backdrops,
  renderIndex,
  selectedIndex,
  children,
}: SearchResult) {
  const releaseYear = release_date.slice(0, 4);
  const parentClasses = assignClasses(renderIndex, selectedIndex);

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
    <div className={parentClasses}>
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
