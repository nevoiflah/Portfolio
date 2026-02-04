/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950 (darker, richer)
        surface: '#18181b',    // Zinc 900
        primary: '#8b5cf6',    // Violet 500 (vibrant purple)
        secondary: '#06b6d4',  // Cyan 500 (vibrant teal)
        accent: '#f43f5e',     // Rose 500 (pop color)
        text: '#f8fafc',       // Slate 50
        muted: '#a1a1aa',      // Zinc 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
