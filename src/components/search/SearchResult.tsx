import type { Details } from "@/types/tmdb.types";

import Image from "next/image";
import Link from "next/link";

import { getSimpleTitle } from "@/lib/utils";
import { SearchDialogClose } from "./SearchDialog";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

export default function SearchResult({ media }: { media: Details }) {
  const simpleTitle = media.title ? getSimpleTitle(media.title) : "";
  const mediaType = media.mediaType === "movie" ? "film" : "series";

  const poster = (
    <Image
      src={`${IMG_BASE_URL}w92${media.posterPath}`}
      alt={`A promotional poster from ${media.title}`}
      width={92}
      height={138}
      className="h-12 w-8 rounded"
    />
  );

  return (
    media.title &&
    media.releaseDate && (
      <div className="mt-0 flex animate-fade-in-fast items-center justify-start rounded-md hover:bg-background md:py-2">
        <SearchDialogClose asChild>
          <Link
            href={`/${mediaType}/${media.id}/${simpleTitle}`}
            className="flex w-full cursor-default items-center outline-none"
          >
            <div className="pointer-events-none mr-1.5 flex md:px-2">
              {media.posterPath ? poster : ""}
            </div>
            <div className="flex flex-col items-baseline text-left">
              <p className="text-[15px] font-medium">
                {media.title} ({media.releaseDate.slice(0, 4)})
              </p>
              <p className="text-nowrap text-xs font-semibold tracking-wide text-gray md:text-sm md:font-medium">
                {media.mediaType === "movie" ? media.director : media.creator}
              </p>
            </div>

            {/* Badge */}
            <div className="mr-0.5 flex grow justify-end md:mr-4">
              <div className="rounded bg-background-lighter ring-2 ring-white/5">
                <p className="inline-block w-[61.33px] rounded bg-gradient-to-b from-neutral-100 via-neutral-100/80 to-neutral-100/20 bg-clip-text px-2 py-1 text-center text-sm text-transparent">
                  {media.mediaType === "movie" ? "Film" : "Series"}
                </p>
              </div>
            </div>
          </Link>
        </SearchDialogClose>
      </div>
    )
  );
}
