import type { Config } from "tailwindcss";

import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        "fade-in-fast": "fade-in 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        "fade-out": "fade-out 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        "fade-out-fast":
          "fade-out 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        "ios-safari-prevent-scroll-on-focus":
          "ios-safari-prevent-scroll-on-focus 0.1s",
        "scale-to-right":
          "scale-to-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
      colors: {
        background: "var(--background)",
        "extra-dark": "var(--extra-dark)",
        foreground: "var(--foreground)",
        gray: "rgb(134, 143, 151)",
      },
      fontFamily: {
        manrope: "var(--font-manrope)",
        "bespoke-serif": "var(--font-bespoke-serif)",
      },
      keyframes: {
        "ios-safari-prevent-scroll-on-focus": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
