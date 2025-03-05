import { redirect } from "next/navigation";

import { db } from "@/drizzle";
import { listSlugHistoryTable, listTable, user } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

import { verifyUser } from "@/lib/verifyUser";
import CollectionPage from "./CollectionPage";

/**
 * Gets user id associated with a username.
 * @param username - The username to resolve to an ID.
 * @returns A promise that resolves to a user id or null if user does not exist.
 */
async function getUserIdByUsername(username: string) {
  const [result] = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  if (result && result.id) {
    return result.id;
  }

  return null;
}

/**
 * Resolves old slug to current slug.
 * @param userId - The ID of the user who owns the list.
 * @param oldSlug - The old slug to be resolved.
 * @returns A promise that resolves to the current slug or null if no new slug is found.
 */
async function resolveSlug(userId: string, oldSlug: string) {
  const [result] = await db
    .select({ newSlug: listTable.slug })
    .from(listTable)
    .innerJoin(
      listSlugHistoryTable,
      eq(listTable.id, listSlugHistoryTable.listId),
    )
    .where(
      and(
        eq(listTable.userId, userId),
        eq(listSlugHistoryTable.oldSlug, oldSlug),
      ),
    );

  return result?.newSlug ?? null;
}

export default async function Page({
  params,
}: {
  params: Promise<{
    username: string;
    collectionName: string;
  }>;
}) {
  const { username, collectionName: listName } = await params;
  const activeUser = await verifyUser();

  const userId = await getUserIdByUsername(username);
  const newSlug = userId && (await resolveSlug(userId, listName));

  if (!newSlug) {
    return (
      <CollectionPage
        username={username}
        listSlug={listName}
        activeUser={activeUser}
      />
    );
  }

  return redirect(`/${username}/collections/${newSlug}`);
}
