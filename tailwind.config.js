/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0392B',
        'primary-light': '#E85D5D',
        'primary-dark': '#96281B',
        'primary-bg': '#FDF2F2',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '45px': '45px',
      }
    },
  },
  plugins: [],
}
