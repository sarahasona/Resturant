/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      padding: { DEFAULT: "15px" },
    },

    fontFamily: {
      primary: "DM Serif Display",
      secondary: "Jost",
      tertiary: "Bad Script",
    },
    backgroundImage: {
      hero: "",
      grid: "",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#292f36",
          hover: "#ffa500",
        },
        secondary: "#4d5053",
        accent: {
          DEFAULT: "#ffa500",
          secondary: "#f4f0ec",
          hover: "#b88c5d",
        },
      },
    },
  },
  plugins: [],
};
