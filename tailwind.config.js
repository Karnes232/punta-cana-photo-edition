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
        // The self-hosted variable fonts register under "<Name> Variable".
        // The plain name is kept as a second entry so anything still serving
        // the old Google Fonts build keeps working, then a real fallback stack.
        crimson: [
          "Crimson Pro Variable",
          "Crimson Pro",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        montserrat: [
          "Montserrat Variable",
          "Montserrat",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        lato: ["Lato", "system-ui", "sans-serif"],
        garamond: ["Garamond", "Georgia", "serif"],
        playfair: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
