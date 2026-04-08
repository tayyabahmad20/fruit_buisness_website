/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fl-green': '#2d6a4f',
        'fl-orange': '#f4831f',
        'fl-cream': '#fef9f0',
        'fl-dark': '#1a1a2e',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-alt': 'floatAlt 3.5s ease-in-out infinite',
        'spin-bounce': 'spinBounce 1s ease-in-out infinite',
        'pulse-border': 'pulseBorder 2s ease-in-out infinite',
        'glow-green': 'glowGreen 2.5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-5deg)' },
          '50%': { transform: 'translateY(-28px) rotate(5deg)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0px) rotate(5deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-5deg)' },
        },
        spinBounce: {
          '0%, 100%': { transform: 'rotate(-15deg) scale(1)' },
          '50%': { transform: 'rotate(15deg) scale(1.2)' },
        },
        pulseBorder: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(45,106,79,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(45,106,79,0)' },
        },
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(37,211,102,0.5)' },
          '50%': { boxShadow: '0 0 22px rgba(37,211,102,0.9), 0 0 40px rgba(37,211,102,0.4)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

