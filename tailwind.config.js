/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Signal" - neutral greyscale throughout, one electric blue carries every accent
        background: '#0a0a0b', // near-black
        surface:    '#16161a', // graphite
        primary:    '#3b82f6', // Blue 500 - the only hue in the system
        secondary:  '#64748b', // Slate 500 - a muted neutral, deliberately not a 2nd hue
        accent:     '#60a5fa', // Blue 400 - lighter step of primary, for highlights
        text:       '#f4f4f5', // Zinc 100
        muted:      '#8b8b93', // neutral grey
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
