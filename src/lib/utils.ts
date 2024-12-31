import type { ClassValue } from "clsx";

import { Trending } from "@/types/tmdb.types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default async function fetchRoute<T extends "movie" | "tv" | "person">(
  endpoint: string,
): Promise<Trending<T>[] | undefined> {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`An error occurred while fetching data!`);
    }

    const data: Trending<T>[] = await response.json();

    return data;
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
