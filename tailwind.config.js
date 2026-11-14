/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#111111',
          charcoal: '#1A1A1A',
          dark: '#161616',
          card: '#1F1F1F',
          gold: {
            DEFAULT: '#C6A15B',
            light: '#E5C78A',
            dark: '#A37E3A',
            muted: '#8E733E',
            50: '#FDFBF7',
            100: '#F9F5EC',
            200: '#F1E6D0',
            500: '#C6A15B',
            600: '#B08B45',
          },
          ivory: '#F8F5EF',
          beige: '#EAE3D8',
          border: 'rgba(198, 161, 91, 0.2)',
          'border-light': 'rgba(198, 161, 91, 0.4)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(198, 161, 91, 0.25)',
        'gold-subtle': '0 4px 20px -2px rgba(198, 161, 91, 0.15)',
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
