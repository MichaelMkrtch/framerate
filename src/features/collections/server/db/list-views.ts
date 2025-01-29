import { db } from "@/drizzle";
import { listViewsTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

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

  const hashedIp = ipAddress ? hashIpAddress(ipAddress) : null;

  try {
    await db.execute(sql`
      INSERT INTO ${listViewsTable} (list_id, user_id, ip_address, created_at)
      SELECT ${listId}, ${userId || null}, ${hashedIp}, NOW()
      WHERE NOT EXISTS (
        SELECT 1
        FROM ${listViewsTable}
        WHERE list_id = ${listId}
          AND (user_id = ${userId || null} OR ip_address = ${hashedIp})
          AND created_at > NOW() - INTERVAL '24 hours'
      )
    `);
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        alreadyViewed: false,
        message: `Error tracking view: ${error.message}`,
      };
    }
  }
}
