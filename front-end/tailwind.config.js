const forms = require('@tailwindcss/forms');

const lineClamp = require('./src/lib/tailwind/line-clamp');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.ts', './**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ['gimlet-display', 'serif'],
        sans: ['menca', 'sans-serif'],
      },
      colors: {
        'primary-red': '#A93C3C',
        'lightest-grey': '#F4F4F4',
        // 'dark-green': '#283618',
        // 'dark-orange': '#BC6C25',
        // 'light-orange': '#CC904D',
        // 'light-green': '#606C38',
        // yellow: '#F9F5DB',
      },
      boxShadow: {
        rw: '0 0 0 2px #c32d7b, 0 20px 30px rgba(0,0,0,.2)',
        'rw-2': '0 0 0 1px rgba(0,0,0,0.05), 0 1px 6px 0 rgba(0,0,0,.0)',
        'rw-3': '0 0 0 1px rgba(0,0,0,0.05), 0 20px 30px rgba(0,0,0,.2)',
      },
      container: {
        padding: '1rem',
      },
      fontSize: {
        headline: '9rem',
      },
      padding: {
        '20%': '20%',
        '10%': '10%',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      padding: ['first'],
    },
  },
  plugins: [forms, lineClamp],
};
