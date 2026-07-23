/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: '#0D0D0D',
          50: '#1a1a1a',
          100: '#161616',
          200: '#121212',
          300: '#0f0f0f',
          400: '#0b0b0b',
          500: '#0D0D0D',
          600: '#0a0a0a',
          700: '#080808',
          800: '#050505',
          900: '#020202',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#f9e8b0',
          100: '#f3dc8a',
          200: '#ecca5e',
          300: '#e3bd47',
          400: '#D4AF37',
          500: '#bd9a2c',
          600: '#9c7e23',
          700: '#7a621b',
          800: '#5a4814',
          900: '#3c300e',
        },
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#242424',
          dark: '#111111',
        },
        cream: {
          DEFAULT: '#f5f0e6',
          light: '#faf7f0',
          dark: '#e8e0d0',
        },
        bronze: {
          DEFAULT: '#8C6A3F',
          light: '#a88555',
          dark: '#6e5230',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
        button: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.6)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #f3dc8a 50%, #D4AF37 100%)',
        'royal-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1a1a1a 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
