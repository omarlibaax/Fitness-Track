/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        accent: '#00FF88',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15,23,42,0.75)',
      },
      borderRadius: {
        glass: '1.5rem',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
};

