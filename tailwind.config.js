/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#dce8f5',
          200: '#bcd3ed',
          300: '#8eb5de',
          400: '#5b91cc',
          500: '#3872b8',
          600: '#28589c',
          700: '#21477f',
          800: '#1d3c69',
          850: '#0e2343',
          900: '#08172e',
          950: '#030c1a',
        },
        ocean: {
          light: '#0ea5e9',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          deep: '#042f2e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.35)',
        'glow-sky': '0 0 25px -5px rgba(14, 165, 233, 0.4)',
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.3)',
        'card-hover': '0 20px 35px -10px rgba(8, 23, 46, 0.15), 0 0 1px 1px rgba(14, 165, 233, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'radar': 'radar 4s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
