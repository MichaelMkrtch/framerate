import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

let serverUrl = import.meta.env.VITE_SERVER_URL;

if (import.meta.env.DEV) {
  serverUrl = import.meta.env.VITE_SERVER_DEV_URL;
}

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [usernameClient()],
});
