const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        off: "#F5FAFE",
        text: "#0C6CF2",
        darkText: "#262262",
        dark: "#1A2B6B",
        darkOff: "#DFE7FB",
      },
    },
  },
  plugins: [],
});
