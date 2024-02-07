/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "side-bar":"#2E2E2E",
        "sec-bg-color":"#605E5E",
        "med-bg":"#D9D9D9",
      },
    },
  },
  plugins: [],
}

