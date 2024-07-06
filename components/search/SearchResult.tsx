import Image from "next/image";
import Link from "next/link";
import { type ReactNode, forwardRef } from "react";

import { Media } from "@/types";

import getSimpleTitle from "@/utils/getSimpleTitle";

import Modal from "../ui/Modal";

import { useFilmStore } from "@/store/filmStore";

type SearchResultProps = {
  renderIndex: number;
  selectedIndex: number;
  children: ReactNode;
} & Media;

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
      " md:!bg-cyan-350/80 md:text-gray-850 font-medium md:[&_>a>div>p:nth-child(2)]:text-neutral-700";

  return classes;
}

const SearchResult = forwardRef<HTMLAnchorElement, SearchResultProps>(
  function SearchResult(
    { renderIndex, selectedIndex, children, ...media },
    ref,
  ) {
    // const setFilm = useFilmStore((state) => state.setFilm);
    const simpleTitle = media.title && getSimpleTitle(media.title);
    const mediaType = media.mediaType === "movie" ? "film" : "series";

    const parentClasses = assignClasses(renderIndex, selectedIndex);

    const poster = (
      <Image
        src={`${IMG_BASE_URL}w92${media.posterPath}`}
        alt={`A poster from the film ${media.title}`}
        width={92}
        height={138}
        className="h-12 w-8 rounded"
      />
    );

    const gradient = (
      <div className="h-12 w-8 rounded bg-gradient-to-tr from-indigo-600 to-rose-600" />
    );

    return (
      media.title &&
      media.releaseDate && (
        <div className={parentClasses}>
          <Modal.Close asChild>
            <Link
              ref={ref}
              href={`/${mediaType}/${media.id}/${simpleTitle}`}
              // onClick={() => setFilm(media)}
              className="flex w-full cursor-default items-center outline-none"
            >
              <div className="pointer-events-none mr-1.5 flex md:px-2">
                {media.posterPath ? poster : gradient}
              </div>
              <div className="flex flex-col items-baseline text-left">
                <p className="text-[15px] font-medium">
                  {children} ({media.releaseDate.slice(0, 4)})
                </p>
                <p className="text-nowrap text-xs font-semibold tracking-wide text-neutral-500 md:text-sm md:font-medium">
                  {media.mediaType === "movie" ? media.director : media.creator}
                </p>
              </div>
              <div className="mr-4 flex grow justify-end">
                <div className="rounded bg-gray-850 ring-2 ring-gray-750/70">
                  <p className="inline-block w-[61.33px] rounded bg-gradient-to-b from-zinc-200 via-zinc-200/80 to-zinc-200/20 bg-clip-text px-2 py-1 text-center text-sm text-transparent">
                    {media.mediaType === "movie" ? "Film" : "Series"}
                  </p>
                </div>
              </div>
            </Link>
          </Modal.Close>
        </div>
      )
    );
  },
);

export default SearchResult;
