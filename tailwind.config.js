/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rayo: {
          black: '#050505',
          panel: '#111111',
          panelSoft: '#181818',
          yellow: '#FFD21F',
          amber: '#FFC400',
          muted: '#A1A1AA',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Sora', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        rayo: '0 24px 80px rgba(0, 0, 0, 0.42)',
      },
    },
  },
  plugins: [],
}
