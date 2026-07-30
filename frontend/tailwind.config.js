/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          500: '#eab308',
          600: '#ca8a04',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'drive-in': 'driveIn 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'smoke': 'smoke 3.5s ease-out forwards',
        'pop-in': 'popIn 0.5s ease-out 8.4s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        driveIn: {
          '0%': { transform: 'translateX(calc(-100vw - 200px))' },
          '80%': { transform: 'translateX(0)' },
          '85%': { transform: 'translateX(-6px)' },
          '90%': { transform: 'translateX(4px)' },
          '95%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0)' },
        },
        brake: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '20%': { transform: 'translateX(-4px) rotate(-2deg)' },
          '40%': { transform: 'translateX(3px) rotate(1.5deg)' },
          '60%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '80%': { transform: 'translateX(1px) rotate(0.5deg)' },
          '100%': { transform: 'translateX(0) rotate(0deg)' },
        },
        smoke: {
          '0%': { opacity: '0.7', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.4', transform: 'translateY(-20px) scale(1.5)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(2)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
