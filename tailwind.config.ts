import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),

  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      verscrollBehavior: {
        none: 'none',
      },
      height: {
        'fill-available': '-webkit-fill-available',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
