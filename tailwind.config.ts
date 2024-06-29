import type { Config } from "tailwindcss";

const config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ios-safari-prevent-scroll-on-focus": "ios-safari-prevent-scroll-on-focus 0.1s"
      },
      backgroundImage: {
        "backdrop-shadow":
          "linear-gradient(90deg, #181a1e 0, rgba(24, 26, 30, .986) .97%, rgba(24, 26, 30, .945) 2.07833333%, rgba(24, 26, 30, .883) 3.29666667%, rgba(24, 26, 30, .803) 4.60166667%, rgba(24, 26, 30, .711) 5.96666667%, rgba(24, 26, 30, .61) 7.365%, rgba(24, 26, 30, .504) 8.77166667%, rgba(24, 26, 30, .398) 10.16%, rgba(24, 26, 30, .296) 11.505%, rgba(24, 26, 30, .203) 12.78%, rgba(24, 26, 30, .122) 13.95833333%, rgba(24, 26, 30, .059) 15.01666667%, rgba(24, 26, 30, .016) 15.92833333%, rgba(24, 26, 30, 0) 16.66666667%, rgba(24, 26, 30, 0) 83.33333333%, rgba(24, 26, 30, .016) 84.07166667%, rgba(24, 26, 30, .059) 84.98333333%, rgba(24, 26, 30, .122) 86.04166667%, rgba(24, 26, 30, .203) 87.22%, rgba(24, 26, 30, .296) 88.495%, rgba(24, 26, 30, .398) 89.84%, rgba(24, 26, 30, .504) 91.22833333%, rgba(24, 26, 30, .61) 92.635%, rgba(24, 26, 30, .711) 94.03333333%, rgba(24, 26, 30, .803) 95.39833333%, rgba(24, 26, 30, .883) 96.70333333%, rgba(24, 26, 30, .945) 97.92166667%, rgba(24, 26, 30, .986) 99.03%, #181a1e), linear-gradient(0deg, #181a1e 0, #181a1e 21.48148148%, rgba(24, 26, 30, .986) 23.63703704%, rgba(24, 26, 30, .945) 26.1%, rgba(24, 26, 30, .883) 28.80740741%, rgba(24, 26, 30, .803) 31.70740741%, rgba(24, 26, 30, .711) 34.74074074%, rgba(24, 26, 30, .61) 37.84814815%, rgba(24, 26, 30, .504) 40.97407407%, rgba(24, 26, 30, .398) 44.05925926%, rgba(24, 26, 30, .296) 47.04814815%, rgba(24, 26, 30, .203) 49.88148148%, rgba(24, 26, 30, .122) 52.5%, rgba(24, 26, 30, .059) 54.85185185%, rgba(24, 26, 30, .016) 56.87777778%, rgba(24, 26, 30, 0) 58.51851852%)",
      },
      colors: {
        cyan: {
          350: "#00e4f5",
          450: "#00d1e0",
          550: "#00becc",
        },
        gray: {
          750: "#434343",
          850: "#232323",
          950: "#181a1e",
        },
      },
      fontFamily: {
        gothic: ["var(--font-gothic)"],
        jakarta: ["var(--font-jakarta)"],
        noto: ["var(--font-noto)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ios-safari-prevent-scroll-on-focus": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      screens: {
        "md-tablet": "840px",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
