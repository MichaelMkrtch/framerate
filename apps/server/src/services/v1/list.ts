import { db } from "@server/drizzle";
import { list, listItem } from "@server/drizzle/schema";
import { asc, eq } from "drizzle-orm";

/**
 * Creates a list in database
 * @param data - The list data to insert
 * @returns The newly created list
 */
export async function createList(data: typeof list.$inferInsert) {
  const [result] = await db.insert(list).values(data).returning();
  const formattedResults = { type: "list" as const, ...result };
  return formattedResults;
}

/**
 * Gets all database lists belonging to a user
 * @param userId - The ID of the user for whom to get lists
 * @returns All lists belonging to the user
 */
export async function getLists(userId: string) {
  const results = await db
    .select()
    .from(list)
    .where(eq(list.userId, userId))
    .orderBy(asc(list.createdAt));

  const formattedResults = results.map((result) => ({
    type: "list" as const,
    ...result,
  }));
  return formattedResults;
}

/**
 * Adds list item to a user's existing database list
 * @param data - List item to insert
 * @returns The inserted list item
 */
export async function addListItem(data: typeof listItem.$inferInsert) {
  const [result] = await db.transaction(async (trx) => {
    const insertedItem = await trx.insert(listItem).values(data).returning();

    await trx
      .update(list)
      .set({ updatedAt: new Date() })
      .where(eq(list.id, listItem.listId));

    return insertedItem;
  });

  return result;
}

export async function deleteListItem(listItemId: number) {
  const [result] = await db
    .delete(listItem)
    .where(eq(listItem.id, listItemId))
    .returning();

  return result;
}
