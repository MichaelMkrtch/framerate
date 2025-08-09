import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Issue with env variables in Cloudflare
// let serverUrl = import.meta.env.VITE_SERVER_URL;

// if (import.meta.env.DEV) {
//   serverUrl = import.meta.env.VITE_SERVER_DEV_URL;
// }

let serverUrl = "https://framerate-production.up.railway.app";

if (import.meta.env.DEV) {
  serverUrl = "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [usernameClient()],
});
