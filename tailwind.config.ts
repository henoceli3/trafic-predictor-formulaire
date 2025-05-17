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
        primary: {
          100: "#007f5f",
          200: "#00b285",
          300: "#00e5ab",
        },
        accent: {
          100: "#ffae03",
          200: "#ffae03",
          300: "#ffae03",
        },
        background: {
          100: "#fbfdfd",
          200: "#eaf5f5",
          300: "#d9ecec",
        },
        text: {
          100: "#000e0a",
          200: "#00412e",
          300: "#007453",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
