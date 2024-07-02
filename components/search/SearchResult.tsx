import Image from "next/image";
import Link from "next/link";
import { type ReactNode, forwardRef } from "react";

import { type Film } from "@/types";

import getSimpleTitle from "@/utils/getSimpleTitle";

import Modal from "../ui/Modal";

import { useFilmStore } from "@/store/filmStore";

interface SearchResultProps extends Film {
  renderIndex: number;
  selectedIndex: number;
  children: ReactNode;
}

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

function assignClasses(renderIndex: number, selectedIndex: number) {
  let classes =
    "md:first:!bg-cyan-350/80 hover:bg-neutral-800/60 mt-0 py-1.5 md:mt-1.5 flex items-center justify-start rounded-md md:py-2";

  if (selectedIndex > 0)
    classes = classes.replace(
      "md:first:!bg-cyan-350/80",
      "first:bg-transparent",
    );

  if (selectedIndex === renderIndex)
    classes +=
      " md:!bg-cyan-350/80 md:text-gray-850 md:[&_>button>div>span]:text-gray-850/60 font-medium";

  return classes;
}

const SearchResult = forwardRef<HTMLAnchorElement, SearchResultProps>(
  function SearchResult(
    { renderIndex, selectedIndex, children, ...film },
    ref,
  ) {
    const setFilm = useFilmStore((state) => state.setFilm);
    const simpleTitle = getSimpleTitle(film.title);

    const parentClasses = assignClasses(renderIndex, selectedIndex);

    const poster = (
      <Image
        src={`${IMG_BASE_URL}w92${film.posterPath}`}
        alt={`A poster from the film ${film.title}`}
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
        <Modal.Close asChild>
          <Link
            ref={ref}
            href={`/film/${film.id}/${simpleTitle}`}
            onClick={() => setFilm(film)}
            className="flex w-full cursor-default items-center outline-none"
          >
            <div className="pointer-events-none mr-1.5 flex md:px-2">
              {film.posterPath ? poster : gradient}
            </div>
            {/* <div className="flex items-baseline text-left text-base">
              <p className="w-full">
                {children} ({film.release_date.slice(0, 4)})
                <span className="text-nowrap pl-2.5 text-xs font-medium tracking-wide text-neutral-600 md:text-sm">
                  {film.director}
                </span>
              </p>
            </div> */}
            <div className="flex flex-col items-baseline text-left">
              <p className="text-[15px] font-medium">
                {children} ({film.releaseDate.slice(0, 4)})
              </p>
              <p className="text-nowrap text-xs font-semibold tracking-wide text-neutral-500 md:text-sm md:font-medium md:text-neutral-700">
                {film.director}
              </p>
            </div>
          </Link>
        </Modal.Close>
      </div>
    );
  },
);

export default SearchResult;
