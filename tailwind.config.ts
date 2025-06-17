import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: "#FFFFFF",
          light: "#EDEDED",
          dark: "#2E2E2E",
        },
        dark: {
          DEFAULT: "#111827",
          light: "#374151",
          dark: "#0F172A",
        },
        primary: {
          DEFAULT: "#1E40AF",
          light: "#3B82F6",
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#6EE7B7",
          dark: "#047857",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "calc-100-minus-12rem": "calc(100% - 12rem)",
        "calc-100-minus-3rem": "calc(100% - 3rem)",
      },
    },
  },
  plugins: [],
};
export default config;
