import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      boundaries,
    },

    settings: {
      "boundaries/include": ["src/**/*"],

      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",

          pattern: [
            "src/components/**/*",
            "src/data/**/*",
            "src/drizzle/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/server/**/*",
            "src/store/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*", "src/tasks/**/*"],
        },
      ],
    },

    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",

          rules: [
            {
              from: ["shared"],
              allow: ["shared"],
            },
            {
              from: ["feature"],

              allow: [
                "shared",
                [
                  "feature",
                  {
                    featureName: "${from.featureName}",
                  },
                ],
              ],
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],

              allow: [
                [
                  "app",
                  {
                    fileName: "*.css",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  },
];
