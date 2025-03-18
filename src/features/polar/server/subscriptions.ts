"use server";

import { db } from "@/drizzle";
import { subscriptions } from "@/drizzle/schema";
import {
  ActiveSubData,
  CanceledSubData,
  RevokedSubData,
  UncancelSubData,
  UpdatedSubData,
} from "@/types/data.types";
import { eq } from "drizzle-orm";

export async function createSubscription(data: ActiveSubData) {
  try {
    console.log("creating");

    await db
      .insert(subscriptions)
      .values(data)
      .onConflictDoNothing({ target: subscriptions.userId });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Something went wrong while activating subscription!");
    }
  }
}

export async function cancelSubscription(data: CanceledSubData) {
  try {
    console.log("cancelling");
    const { userId, status, plan, renewalDate, endDate } = data;

    await db
      .update(subscriptions)
      .set({ status, plan, renewalDate, endDate })
      .where(eq(subscriptions.userId, userId));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Something went wrong while canceling subscription!");
    }
  }
}

export async function uncancelSubscription(data: UncancelSubData) {
  try {
    console.log("uncanceling");
    const { userId, status, plan, renewalDate, endDate } = data;

    await db
      .update(subscriptions)
      .set({
        status,
        plan,
        renewalDate,
        endDate,
      })
      .where(eq(subscriptions.userId, userId));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Something went wrong while uncanceling subscription!");
    }
  }
}

export async function updateSubscription(data: UpdatedSubData) {
  try {
    console.log("updating");
    const { userId, ...updatedData } = data;

    await db
      .update(subscriptions)
      .set(updatedData)
      .where(eq(subscriptions.userId, userId));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Something went wrong while updating subscription!");
    }
  }
}

export async function revokeSubscription(data: RevokedSubData) {
  try {
    console.log("revoking");
    const { userId, status, plan, renewalDate, endDate } = data;

    await db
      .update(subscriptions)
      .set({ status, plan, renewalDate, endDate })
      .where(eq(subscriptions.userId, userId));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error("Something went wrong while ending subscription!");
    }
  }
}
