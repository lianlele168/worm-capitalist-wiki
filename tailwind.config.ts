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
        ink: {
          950: "#21182d",
          900: "#30223f",
          800: "#463354",
          700: "#604b6b",
        },
        lilac: {
          700: "#7353a5",
          600: "#8968b8",
          500: "#a987d2",
          200: "#dfcff0",
          100: "#f1e9f8",
        },
        mint: {
          700: "#28735d",
          500: "#58aa87",
          200: "#bde3d1",
          100: "#e5f5ed",
        },
        apricot: {
          600: "#c96e47",
          500: "#e68b60",
          200: "#f6c5a8",
          100: "#fff0e5",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "sans-serif"],
        display: ["var(--font-fredoka)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 46px rgba(48, 34, 63, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
