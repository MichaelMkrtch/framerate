import { useFilmStore } from "@/store/filmStore";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

import { type Film } from "@/types";

import Modal from "../ui/Modal";

interface SearchResult extends Film {
  renderIndex: number;
  selectedIndex: number;
  children: ReactNode;
}

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

function assignClasses(renderIndex: number, selectedIndex: number) {
  let classes =
    "first:!bg-cyan-350/80 hover:bg-neutral-800/60 mt-1.5 flex items-center justify-start rounded-md py-2";

  if (selectedIndex > 0)
    classes = classes.replace("first:!bg-cyan-350/80", "first:bg-transparent");

  if (selectedIndex === renderIndex)
    classes +=
      " !bg-cyan-350/80 text-gray-850 [&_>button>div>span]:text-gray-850/60 font-medium";

  return classes;
}

export default function SearchResult({
  renderIndex,
  selectedIndex,
  children,
  ...film
}: SearchResult) {
  const setFilm = useFilmStore((state) => state.setFilm);

  const parentClasses = assignClasses(renderIndex, selectedIndex);

  const poster = (
    <Image
      src={`${IMG_BASE_URL}w92${film.poster_path}`}
      alt={`A poster from the film ${film.title}`}
      width={92}
      height={138}
      className="h-12 w-8 rounded"
    />
  );

  const gradient = (
    <div className="h-12 w-8 rounded bg-gradient-to-tr from-indigo-600 to-rose-600" />
  );

  // Removes special characters and formats title for URL
  const simpleTitle = film.title
    .replaceAll(/[^a-zA-Z0-9 ]/g, "")
    .replaceAll(/\s{2,}/g, "-")
    .replaceAll(" ", "-")
    .toLowerCase();

  return (
    <div className={parentClasses}>
      <Modal.Close asChild>
        <Link
          href={`/film/${film.id}/${simpleTitle}`}
          onClick={() => setFilm(film)}
          className="flex w-full cursor-default items-center outline-none"
        >
          <div className="pointer-events-none mr-1.5 flex px-2">
            {film.poster_path ? poster : gradient}
          </div>
          <div className="flex items-baseline text-left">
            <p>
              {children} ({film.release_date})
            </p>
          </div>
        </Link>
      </Modal.Close>
    </div>
  );
}
