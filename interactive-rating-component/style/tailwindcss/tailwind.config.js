/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../../*.html", "../../script/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(25, 97%, 53%)",
        litegray: "hsl(217, 12%, 63%)",
        medgray: "hsl(216, 12%, 54%)",
        darkblue: "hsl(213, 19%, 18%)",
        verydarkblue: "hsl(216, 12%, 8%)"
      },
      fontFamily: {
        Overpass: ["Overpass", "sans-serif"],
      }
    },
  plugins: [],
  }
}
