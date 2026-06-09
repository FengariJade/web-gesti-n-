/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f1220',
        electric: '#315ff4',
        violet: '#5b4bff',
      },
      boxShadow: {
        'picker': '0 18px 45px rgba(49, 95, 244, 0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .38s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
