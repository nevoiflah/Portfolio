/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Signal" — neutral greyscale throughout, one electric blue carries every accent
        background: '#0a0a0b', // near-black
        surface:    '#16161a', // graphite
        primary:    '#3b82f6', // Blue 500 — the only hue in the system
        secondary:  '#64748b', // Slate 500 — a muted neutral, deliberately not a 2nd hue
        accent:     '#60a5fa', // Blue 400 — lighter step of primary, for highlights
        text:       '#f4f4f5', // Zinc 100
        muted:      '#8b8b93', // neutral grey
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'gradient': 'gradient 6s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      }
    },
  },
  plugins: [],
}
