import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

let serverUrl = import.meta.env.VITE_BETTER_AUTH_URL;

if (import.meta.env.DEV) {
  serverUrl = import.meta.env.VITE_BETTER_AUTH_DEV_URL;
}

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [usernameClient()],
});
