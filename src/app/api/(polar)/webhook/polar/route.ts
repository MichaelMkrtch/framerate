import { Webhooks } from "@polar-sh/nextjs";

import {
  cancelSubscription,
  createSubscription,
  revokeSubscription,
  uncancelSubscription,
  updateSubscription,
} from "@/features/polar/server/subscriptions";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    try {
      switch (payload.type) {
        case "checkout.created":
          break;
        case "order.created":
          // Handles upgrades and downgrades
          // Not triggered by activate, cancel, nor revoke
          console.log("order.created");
          if (
            payload.data.billingReason === "subscription_update" &&
            payload.data.subscription?.status === "active"
          ) {
            console.log("update in order_create");

            const subData = {
              userId: payload.data.customer.externalId!,
              status: payload.data.subscription.status,
              plan: payload.data.product.name,
              productId: payload.data.productId,
              startDate: payload.data.createdAt,
              renewalDate: payload.data.subscription.currentPeriodEnd,
              endDate: payload.data.subscription.endsAt,
            };

            await updateSubscription(subData);
          }

          break;
        case "subscription.active":
          if (payload.data.status === "active") {
            const subData = {
              userId: payload.data.customer.externalId!,
              status: payload.data.status,
              plan: payload.data.product.name,
              productId: payload.data.productId,
              startDate: payload.data.createdAt,
              renewalDate: payload.data.currentPeriodEnd,
              endDate: payload.data.endsAt,
            };

            await createSubscription(subData);
          }

          break;
        case "subscription.canceled":
          console.log("cancel case");
          if (payload.data.cancelAtPeriodEnd) {
            const subData = {
              userId: payload.data.customer.externalId!,
              status: payload.data.status,
              plan: payload.data.product.name,
              renewalDate: null,
              endDate: payload.data.endsAt!,
            };

            await cancelSubscription(subData);
          }
          break;
        case "subscription.uncanceled":
          console.log("subscription uncanceled");

          if (
            payload.data.status === "active" &&
            !payload.data.cancelAtPeriodEnd
          ) {
            const subData = {
              userId: payload.data.customer.externalId!,
              status: payload.data.status,
              plan: payload.data.product.name,
              renewalDate: payload.data.currentPeriodEnd,
              endDate: null,
            };

            await uncancelSubscription(subData);
          }
          break;
        case "subscription.revoked":
          console.log("revoke");
          if (payload.data.status === "canceled") {
            const subData = {
              userId: payload.data.customer.externalId!,
              status: payload.data.status,
              plan: "Free" as const,
              renewalDate: null,
              endDate: payload.data.endsAt!,
            };

            await revokeSubscription(subData);
          }

          break;
        case "refund.created":
          console.log("refund created");
          break;
        case "refund.updated":
          console.log("refund updated");
          break;
        default:
          console.log("Unknown event", payload.type);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  },
});
