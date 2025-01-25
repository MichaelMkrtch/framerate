"use server";

import { db } from "@/drizzle";
import { listTable, movieTable, tvShowTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export async function generateSlug(
  title: string,
  contentType: "movie" | "tv" | "list",
) {
  const allowedContentTypes = ["movie", "tv", "list"];

  if (
    typeof title !== "string" ||
    title.length > 100 ||
    title === "" ||
    !allowedContentTypes.includes(contentType)
  ) {
    throw new Error("Invalid title or content type provided.");
  }

  const baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await slugExists(uniqueSlug, contentType)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

async function slugExists(
  uniqueSlug: string,
  contentType: "movie" | "tv" | "list",
) {
  const tableMap = { movie: movieTable, tv: tvShowTable, list: listTable };

  const table = tableMap[contentType];
  if (!table) throw new Error("Invalid content type");

  const result = await db
    .select()
    .from(table)
    .where(eq(table.slug, uniqueSlug));
  return result.length > 0;
}
