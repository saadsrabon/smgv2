/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bengali': ['Bornomala', 'sans-serif'],
        'english': ['Ubuntu Sans', 'sans-serif'],
      },
      colors: {
        primary: '#0ea5e9',
        secondary: {
          teal: '#14b8a6',
          orange: '#f97316',
          pink: '#ec4899',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          muted: '#64748b',
          border: '#e2e8f0',
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
