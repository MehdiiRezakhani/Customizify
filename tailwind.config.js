/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#172142",
        primaryLight:"#4f5770",
        secondary:"#626263",
        secondaryLight:"#e1e2e3",

      },
      boxShadow: {
       shadowA:  "0 2px 30px rgb(31, 48, 135 , 25%)",
      },
    },
  },
  plugins: [],
}