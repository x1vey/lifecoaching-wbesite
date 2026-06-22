/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f5f0', // Off-white/Cream
          100: '#e8e8e0',
          200: '#d1d1c2',
          300: '#b8b8a3',
          400: '#9e9e85',
          500: '#85856b',
          600: '#6b6b55',
          700: '#525240',
          800: '#38382b',
          900: '#1c1c14', // Deep Olive/Forest Black
        },
        clay: {
          50: '#faf9f6',
          100: '#f4f1ea',
          200: '#e7dfd0',
          300: '#d7c7af',
          400: '#c5ae8c',
          500: '#b2946c',
          600: '#9a7a56',
          700: '#7c6146',
          800: '#5e4936',
          900: '#423428',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'super-wide': '0.25em',
        'editorial': '0.15em',
      },
      lineHeight: {
        'editorial': '1.3',
      }
    },
  },
  plugins: [],
}
