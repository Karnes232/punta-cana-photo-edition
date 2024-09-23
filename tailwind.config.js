/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./node_modules/react-tailwindcss-datepicker/dist/index.esm.js`,
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "primary-bg-color": "var(--primary-bg-color)",
      },
      fontFamily: {
        crimson: ["Crimson"],
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
    },
  },
  plugins: [],
};
