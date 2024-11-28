/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F6F4F1',
        surface: '#FCFBF9',
        border: '#E9E6E2',
        primary: '#2C2C2C',
        accent: {
          50: '#F9F7F5',
          100: '#F1EDE8',
          200: '#E4DED6',
          300: '#D7CEC3',
          400: '#C9BEB0',
          500: '#BCAE9D',
          600: '#AE9E8A',
          700: '#A08E77',
          800: '#927E64',
          900: '#846E51',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'elegant': '0 2px 20px rgba(0, 0, 0, 0.03)',
        'elegant-hover': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 1px 3px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(0, 0, 0, 0.04)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#A08E77',
              '&:hover': {
                color: '#846E51',
              },
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};