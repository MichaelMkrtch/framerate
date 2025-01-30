import { db } from "@/drizzle";
import { listViewsTable } from "@/drizzle/schema";
import { and, eq, gte, or } from "drizzle-orm";

import { hashIpAddress } from "@/lib/utils";

export async function trackUniqueView(
  listId: number,
  ipAddress: string | null,
  userId?: string,
) {
  if (!listId || (!userId && !ipAddress)) {
    return {
      success: false,
      alreadyViewed: false,
      message: "Invalid input: unable to store view.",
    };
  }
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const hashedIp = ipAddress ? hashIpAddress(ipAddress) : null;

  try {
    const existingView = await db
      .select()
      .from(listViewsTable)
      .where(
        and(
          eq(listViewsTable.listId, listId),
          gte(listViewsTable.createdAt, oneDayAgo),
          or(
            userId ? eq(listViewsTable.userId, userId) : undefined,
            hashedIp ? eq(listViewsTable.ipAddress, hashedIp) : undefined,
          ),
        ),
      );

    if (existingView.length > 0) {
      return {
        success: true,
        alreadyViewed: true,
        message: "View already logged within the last 24 hours.",
      };
    }

    await db.insert(listViewsTable).values({
      listId,
      userId: userId || null,
      ipAddress: hashedIp,
    });

    return {
      success: true,
      alreadyViewed: false,
      message: "View logged successfully.",
    };
  } catch (_error) {
    return {
      success: false,
      alreadyViewed: false,
      message: "An error occurred while logging the view.",
    };
  }
}
