import type { ClassValue } from "clsx";

import {
  CreatedBy,
  Credits,
  Crew,
  Details,
  Trending,
} from "@/types/tmdb.types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = "trending" | "details";
type MediaType = "movie" | "tv" | "person";
type ReturnType<C extends Category, M extends MediaType> = C extends "trending"
  ? Trending<M>[]
  : Details<M>;

// mediaType parameter aids type inference when calling data fetching hooks
export async function fetchRoute<C extends Category, M extends MediaType>(
  endpoint: string,
  mediaType: M,
  category: C,
): Promise<ReturnType<C, M> | undefined> {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`An error occurred while fetching data!`);
    }

    if (category === "trending") {
      const trendingData = await response.json();
      return trendingData as ReturnType<C, M>;
    }

    if (category === "details") {
      const detailsData = await response.json();
      return detailsData as ReturnType<C, M>;
    }
  } catch (error) {
    if (error instanceof Error) {
      // Error will be caught by TanStack Query
      throw error;
    }
    return undefined;
  }
}

export function convertToCamelCase(item: unknown): unknown {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => convertToCamelCase(el));
  } else if (typeof item === "function" || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(
      ([key, value]: [string, unknown]) => [
        key.replace(/([-_][a-z])/gi, (c) =>
          c.toUpperCase().replace(/[-_]/g, ""),
        ),
        convertToCamelCase(value),
      ],
    ),
  );
}

export const renameKeys = (
  keysMap: Record<string, string>,
  obj: Record<string, unknown>,
) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  );

export function getSimpleTitle(title: string) {
  const simpleTitle = title
    .replaceAll(/[^a-zA-Z0-9 ]/g, "")
    .replaceAll(/\s{2,}/g, "-")
    .replaceAll(" ", "-")
    .toLowerCase();

  return simpleTitle;
}

export default function formatNames(
  nameList: Credits[] | Crew[] | CreatedBy[],
  dataObj: Details,
) {
  // format movie director names
  if (dataObj.mediaType === "movie") {
    const data = { ...dataObj };
    if (nameList.length > 2) {
      data.director =
        nameList
          .map((director) => director.name)
          .slice(0, 2)
          .join(", ") + "...";
    } else if (nameList.length === 2) {
      data.director = nameList.map((director) => director.name).join(", ");
    } else if (nameList.length === 1) {
      data.director = nameList[0].name;
    } else {
      data.director = "Unknown";
    }
    return data;
  }

  // dataObj is a series
  // format series creator names
  const data = { ...dataObj };
  if (nameList.length > 2) {
    data.creator =
      nameList
        .map((creator) => creator.name)
        .slice(0, 2)
        .join(", ") + "...";
  } else if (nameList.length === 2) {
    data.creator = nameList.map((creator) => creator.name).join(", ");
  } else if (nameList.length === 1) {
    data.creator = nameList[0].name;
  } else {
    data.creator = "Unknown";
  }
  return data;
}
