/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rayo: {
          black: '#050505',
          surface: '#0B0B0B',
          panel: '#101010',
          panelSoft: '#16121F',
          yellow: '#FACC15',
          amber: '#FDE047',
          purple: '#7C3AED',
          purpleDeep: '#5B21B6',
          muted: '#A1A1AA',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Sora', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        rayo: '0 24px 80px rgba(0, 0, 0, 0.48)',
        'rayo-purple': '0 0 30px rgba(124, 58, 237, 0.2)',
        'rayo-yellow': '0 0 26px rgba(250, 204, 21, 0.22)',
      },
    },
  },
  plugins: [],
}
