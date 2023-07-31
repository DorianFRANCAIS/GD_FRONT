/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#242B5C",
        lightBlueColor: '#F8F9FD',
        greyColor: "#F5F4F7",
        greyBoldColor: "#A3A3A3",
      },
      borderRadius: {
        twenty: "20px",
      }
    },
  },
  plugins: [require('preline/plugin'),],
}