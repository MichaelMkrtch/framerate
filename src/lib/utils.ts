import type {
  CreatedBy,
  Credits,
  Crew,
  Details,
  Trending,
} from "@/types/tmdb.types";
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPostgresError(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error;
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

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) =>
  Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  ) as Pick<T, K>;

export function formatNames(
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

export function scrollToTop() {
  const duration = 500;
  const start = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smoother animation
    const easeProgress = 1 - Math.pow(1 - progress, 4);

    window.scrollTo(0, start * (1 - easeProgress));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
}

export function formatElapsedTime(date: string | Date): string {
  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const currentDate = new Date();
  const differenceInMillis = currentDate.getTime() - parsedDate.getTime();

  if (differenceInMillis < 1000 * 60) {
    // If less than a minute, display "seconds"
    return "seconds";
  } else if (differenceInMillis < 1000 * 60 * 60) {
    // If less than an hour, show minutes
    const minutesElapsed = Math.floor(differenceInMillis / (1000 * 60));
    return minutesElapsed === 1 ? "1 minute" : `${minutesElapsed} minutes`;
  } else if (differenceInMillis < 1000 * 60 * 60 * 24) {
    // If less than a day, show hours
    const hoursElapsed = Math.floor(differenceInMillis / (1000 * 60 * 60));
    return hoursElapsed === 1 ? "1 hour" : `${hoursElapsed} hours`;
  }

  const yearDiff = currentDate.getFullYear() - parsedDate.getFullYear();
  const monthDiff = currentDate.getMonth() - parsedDate.getMonth();
  const dayDiff = currentDate.getDate() - parsedDate.getDate();

  let totalMonths = yearDiff * 12 + monthDiff;
  if (dayDiff < 0) {
    totalMonths--; // Adjusts for incomplete months
  }

  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    return years === 1 ? "1 year" : `${years} years`;
  } else if (totalMonths >= 1) {
    return totalMonths === 1 ? "1 month" : `${totalMonths} months`;
  } else {
    const daysElapsed = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return daysElapsed === 1 ? "1 day" : `${daysElapsed} days`;
  }
}
