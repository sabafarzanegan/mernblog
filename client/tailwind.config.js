/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        vazir: "vazir",
        lale: "lale",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
  darkMode: "class",
};
