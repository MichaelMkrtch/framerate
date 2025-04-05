import { Webhooks } from "@polar-sh/nextjs";

import { syncSubState } from "@/features/polar/server/subscriptions";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    try {
      switch (payload.type) {
        case "customer.state_changed":
          const userId = payload.data.externalId;
          const activeSub = payload.data.activeSubscriptions[0] ?? null;

          if (!userId) {
            console.error(
              "Webhook payload missing externalId. Cannot process.",
            );
            break;
          }

          try {
            await syncSubState(userId, activeSub);
          } catch (error) {
            console.error(`Failed to sync subscription state.`, error);
          }
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
