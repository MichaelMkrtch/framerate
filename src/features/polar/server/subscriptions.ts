"use server";

import { db } from "@/drizzle";
import { subscriptions } from "@/drizzle/schema";
import { CustomerStateSubscription } from "@polar-sh/sdk/models/components/customerstatesubscription.js";
import { eq } from "drizzle-orm";

type SubStatus = "active" | "canceled" | "inactive";

type SubState = {
  status: SubStatus;
  productId: string | null;
  renewalDate: Date | null;
  endDate: Date | null;
};

function areStatesEqual(
  dbState: SubState | null | undefined,
  incomingState: SubState,
) {
  // No DB state is equivalent to inactive status (revoked) in the incoming data
  if (!dbState) {
    return incomingState.status === "inactive";
  }

  // If incoming is inactive, they are equal when DB is inactive (revoked)
  if (incomingState.status === "inactive") {
    return dbState.status === "inactive";
  }

  return (
    dbState.status === incomingState.status &&
    dbState.productId === incomingState.productId &&
    dbState.renewalDate?.getTime() === incomingState.renewalDate?.getTime() &&
    dbState.endDate?.getTime() === incomingState.endDate?.getTime()
  );
}

export async function syncSubState(
  userId: string,
  subData: CustomerStateSubscription | undefined,
) {
  let targetState: SubState;

  if (subData) {
    // User created subscription or has an existing subscription, even if canceled (but not revoked)
    let renewalDate = subData.currentPeriodEnd
      ? new Date(subData.currentPeriodEnd)
      : null;
    const endDate = subData.endsAt ? new Date(subData.endsAt) : null;

    // Type cast necessary since Polar status can only be active here
    // Polar represents canceled with an active status and bool flag for cancelAtPeriodEnd
    // Additional statuses simplify representation of customer state
    let status = subData.status as SubStatus;
    if (subData.cancelAtPeriodEnd && status === "active") {
      status = "canceled";
      renewalDate = null;
    }

    targetState = {
      status: status,
      productId: subData.productId,
      renewalDate,
      endDate,
    };
  } else {
    // New user going through checkout or user's subscription revoked
    // activeSubscriptions field in payload does not exist
    targetState = {
      status: "inactive", // subData.status is undefined here
      productId: null,
      renewalDate: null,
      endDate: null,
    };
  }

  try {
    // Transaction to prevent race conditions in DB
    await db.transaction(async (tx) => {
      // Active, canceled, and revoked subs will have data in DB
      const [storedSub] = await tx
        .select({
          status: subscriptions.status,
          productId: subscriptions.productId,
          renewalDate: subscriptions.renewalDate,
          endDate: subscriptions.endDate,
        })
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))
        .for("update");

      const currentDbState: SubState | null = storedSub
        ? {
            status: storedSub.status as SubStatus,
            productId: storedSub.productId,
            renewalDate: storedSub.renewalDate,
            endDate: storedSub.endDate,
          }
        : null;

      if (areStatesEqual(currentDbState, targetState)) {
        return;
      }

      if (!currentDbState && targetState.status !== "inactive") {
        // State doesn't exist in DB, and incoming state is active/canceled
        // New user subscription
        await tx.insert(subscriptions).values({
          userId: userId,
          status: targetState.status,
          productId: targetState.productId!,
          startDate: subData?.createdAt
            ? new Date(subData.createdAt)
            : new Date(),
          renewalDate: targetState.renewalDate,
          endDate: targetState.endDate,
        });
      } else if (currentDbState) {
        // All other events: upgrade/downgrade/cancel/uncancel/revoke

        const productId = targetState.productId ?? currentDbState.productId;
        let endDate = targetState.endDate;

        if (targetState.status === "inactive") {
          endDate = new Date();
        }

        await tx
          .update(subscriptions)
          .set({
            status: targetState.status,
            productId: productId!,
            renewalDate: targetState.renewalDate,
            endDate,
          })
          .where(eq(subscriptions.userId, userId));
      } else {
        // DB state doesn't exist and target is inactive.
        return;
      }
    });
  } catch (error) {
    console.error("Error while syncing subscription status", error);
    if (error instanceof Error) {
      throw new Error(
        "Something went wrong while syncing subscription status!",
      );
    }
    throw error;
  }
}
