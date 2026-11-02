/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2e241b',
          950: '#fdf7ed',
          900: '#ffffff',
          800: '#fffaf3',
          700: '#f8edde',
          600: '#efdcc8',
        },
        parchment: '#2e241b',
        muted: '#6d5c4b',
        brass: {
          DEFAULT: '#b94e1a',
          light: '#9c4416',
          dark: '#7c330f',
        },
        sage: '#1f7a68',
        wine: '#a83b33',
        sun: '#f4b740',
        line: '#eadbc8',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        shelf: '0 30px 80px -46px rgba(80, 52, 28, 0.55)',
        plate: '0 20px 45px -30px rgba(80, 52, 28, 0.38)',
        card: '0 2px 0 rgba(46, 36, 27, 0.03), 0 22px 50px -32px rgba(80, 52, 28, 0.34)',
        lift: '0 30px 60px -30px rgba(80, 52, 28, 0.42)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.94)', opacity: '0' },
          '70%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        pop: 'pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
