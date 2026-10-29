/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b0a08',
          900: '#12100c',
          800: '#181510',
          700: '#211d16',
          600: '#2c271e',
        },
        parchment: '#eee6d7',
        muted: '#a59b88',
        brass: {
          DEFAULT: '#c9a96e',
          light: '#e3c996',
          dark: '#8f7444',
        },
        sage: '#8fb8a0',
        wine: '#8c3f35',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Karla', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        shelf: '0 32px 80px -40px rgba(0, 0, 0, 0.95)',
        plate: '0 22px 50px -30px rgba(0, 0, 0, 0.9)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
