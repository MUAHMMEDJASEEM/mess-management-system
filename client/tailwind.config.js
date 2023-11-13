/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-gray": "#DCDCDC",
        "dark-gray": 	"#696969",
        "pink-grad": "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(232,9,212,1) 1%, rgba(148,0,215,1) 100%)",
        'pink-icon-bg': '#FFE4F1',
        'dark-dark-gray': '#4A4A4A',
        'purple': 'rgba(148,0,215,1)',
        'onion': '#CB6094'
      }
    },
  },
  plugins: [],
}
