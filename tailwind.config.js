/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
        night: '#0f172a',
      },
      boxShadow: {
        glow: '0 18px 45px rgba(249, 115, 22, 0.18)',
        float: '0 18px 40px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(14,165,233,0.16), transparent 36%), radial-gradient(circle at 80% 20%, rgba(249,115,22,0.18), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,247,237,0.92))',
        'dark-hero':
          'radial-gradient(circle at top, rgba(14,165,233,0.2), transparent 36%), radial-gradient(circle at 80% 20%, rgba(251,146,60,0.2), transparent 28%), linear-gradient(135deg, rgba(15,23,42,0.96), rgba(17,24,39,0.94))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'page-in': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.85 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'page-in': 'page-in 500ms ease-out',
        'pulse-soft': 'pulseSoft 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
