/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7F4',
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#74C69D',
          500: '#52B788',
          600: '#40916C',
          700: '#2D6A4F', // Primary Forest Green
          800: '#1B4332',
          900: '#081C15',
        },
        sand: {
          50: '#FDFAF7',
          100: '#FAF8F5', // Primary body background
          200: '#F4EFEA',
          300: '#E8E2DA', // Card borders
          400: '#D6CFC5',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          soft: '#333333',
          muted: '#6B7280',
        },
        accent: {
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          orange: '#EA580C',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'premium': '0 12px 35px -4px rgba(27, 67, 50, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [],
}
