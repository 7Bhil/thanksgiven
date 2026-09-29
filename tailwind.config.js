/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brun: {
          DEFAULT: '#1a0f0a',
          50: '#fbf8f6',
          100: '#f4ede8',
          200: '#e8dbd1',
          300: '#d5beaec',
          400: '#b89680',
          500: '#946e55',
          600: '#72503d',
          700: '#53392b',
          800: '#321e14',
          900: '#1a0f0a',
          950: '#0d0705',
        },
        creme: {
          DEFAULT: '#f4ead8',
          50: '#fdfcf9',
          100: '#faf5ee',
          200: '#f4ead8',
          300: '#ebd9ba',
          400: '#dec195',
          500: '#cfa56f',
          600: '#b78951',
          700: '#926a3c',
          800: '#725232',
          900: '#563e26',
        },
        orange: {
          DEFAULT: '#d9622b',
          accent: '#d9622b',
          light: '#e27b49',
          dark: '#b34a1b',
        },
        ambre: {
          DEFAULT: '#c27827',
          light: '#d48d3b',
          dark: '#9e5e1b',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
