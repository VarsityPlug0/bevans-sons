/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#111111',
          dark: '#1D1D1D',
          gold: '#C8B993',
          light: '#F5F5F5',
          mid: '#DADADA',
          muted: '#A7A7AA',
          olive: '#68705C',
          sage: '#E9ECE6',
        },
      },
    },
  },
  plugins: [],
}
