/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./node_modules/react-tailwindcss-datepicker/dist/index.esm.js`,
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
        // => @media (min-width: 2000px) { ... }
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "primary-bg-color": "var(--primary-bg-color)",
        "secondary-bg-color": "var(--secondary-bg-color)",
      },
      fontFamily: {
        crimson: ["Crimson Pro"],
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
    },
  },
  plugins: [],
};
