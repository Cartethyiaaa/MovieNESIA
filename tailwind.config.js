/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a0b12",
        accent: "#e50914",
        plum: "#1c1330",
        gold: "#f2c245",
      },
    },
  },
  plugins: [],
}
