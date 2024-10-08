/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: { DEFAULT: "15px" },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1400px",
    },
    fontFamily: {
      primary: "DM Serif Display",
      secondary: "Jost",
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
