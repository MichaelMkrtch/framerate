import type { App } from '@framerate/server';

import { treaty } from '@elysiajs/eden';

let serverUrl = import.meta.env.VITE_SERVER_URL!;

if (import.meta.env.DEV) {
  serverUrl = import.meta.env.VITE_SERVER_DEV_URL!;
}

export const client = treaty<App>(serverUrl, {
  fetch: {
    credentials: 'include',
  },
});
