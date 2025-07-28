/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",    // container
      "../footer/src/**/*.{js,jsx,ts,tsx}",
      "../loginpage/src/**/*.{js,jsx,ts,tsx}",
      "../navbar/src/**/*.{js,jsx,ts,tsx}",
      "../signuppage/src/**/*.{js,jsx,ts,tsx}",
      "../homepage/src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }