import type { App } from "@server/index";

import { treaty } from "@elysiajs/eden";

let serverUrl = import.meta.env.VITE_BETTER_AUTH_URL ?? "localhost:8000";

if (import.meta.env.DEV) {
  serverUrl = import.meta.env.VITE_BETTER_AUTH_DEV_URL ?? "localhost:8000";
}

export const client = treaty<App>(serverUrl, {
  fetch: {
    credentials: "include",
  },
});
