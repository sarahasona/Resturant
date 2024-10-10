/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
<<<<<<< HEAD
=======
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
>>>>>>> 90891642232dde8084d886239461e7da060921a2
    extend: {
      keyframes: {
        colorTravel: {
          '0%': {
            backgroundPosition: '0% 50%',
            color: '#FF6347',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            color: '#FFD700',
          },
          '100%': {
            backgroundPosition: '100% 50%',
            color: '#FFA500',
          },
        },
      },
      animation: {
        colorTravel: 'colorTravel 0.5s ease-in-out forwards',
      },
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
        'gradient-travel': 'linear-gradient(90deg, red, yellow, transparent)',
      },
    },
  },
  plugins: [],
};
