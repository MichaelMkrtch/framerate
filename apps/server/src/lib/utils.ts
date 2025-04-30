import { movieReview, tvReview } from "@server/drizzle/schema";

/**
Renames object keys and preserves types
 * @param keysMap - An object mapping the keys to rename with their new names as values
 * @param obj - The object to mutate
 * @returns An object with renamed keys
 */
export const renameKeys = <
  T extends Record<string, any>,
  M extends Partial<Record<keyof T, string>>,
>(
  keysMap: M,
  obj: T,
): T => {
  const result = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = keysMap[key] || key;
      result[newKey as keyof T] = obj[key];
    }
  }

  return result;
};

/**
Formats an object of people into a string of names
 * @param people - An array of objects containing details about people
 * @returns A string of formatted names
 */
export function formatNames(people: { name?: string | null }[] | null): string {
  // Filters out invalid objects
  const validNames = people
    ?.map((person) => person.name)
    .filter((name): name is string => !!name && name.trim() !== "");

  if (!validNames || validNames.length === 0) {
    return "Unknown";
  }

  if (validNames.length > 2) {
    return validNames.slice(0, 2).join(", ") + "...";
  } else if (validNames.length === 2) {
    return validNames.join(", ");
  } else {
    return validNames[0] || "Unknown";
  }
}

/**
 * Utility for getting a table dynamically
 *
 * @returns Table object containing the table and its media ID field
 */
export function getTables() {
  const tables = {
    movie: {
      table: movieReview,
      idCol: movieReview.movieId,
      idColName: "movieId",
    },
    tv: {
      table: tvReview,
      idCol: tvReview.seriesId,
      idColName: "seriesId",
    },
  } as const;

  return tables;
}
