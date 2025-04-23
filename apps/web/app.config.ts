import { defineConfig } from "@tanstack/react-start/config";

import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    unenv: cloudflare,
    output: {
      dir: "dist",
    },
  },
  tsr: {
    appDirectory: "src",
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
