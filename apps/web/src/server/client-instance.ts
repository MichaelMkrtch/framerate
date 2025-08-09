import type { App } from "@server/index";

import { treaty } from "@elysiajs/eden";

// let serverUrl = import.meta.env.VITE_SERVER_URL ?? "failed prod";

// if (import.meta.env.DEV) {
//   serverUrl = import.meta.env.VITE_SERVER_DEV_URL ?? "failed dev";
// }

let serverUrl = "https://framerate-production.up.railway.app";

if (import.meta.env.DEV) {
  serverUrl = "http://localhost:3000";
}

export const client = treaty<App>(serverUrl, {
  fetch: {
    credentials: "include",
  },
});
