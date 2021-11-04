/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require('@tailwindcss/forms');

const lineClamp = require('./lib/tailwind/line-clamp');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.ts', './**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'rw-pink': '#c32d7b',
        'rw-blue': '#2c75b0',
        'rw-gray': '#393f44',
        'rw-gray-2': '#717171',
        'rw-gray-3': 'hsla(0,0%,44.3%,.8)',
        'rw-gray-4': '#f0f1f2',
        'rw-yellow': '#fab72e',
      },
      boxShadow: {
        rw: '0 0 0 2px #c32d7b, 0 20px 30px rgba(0,0,0,.2)',
        'rw-2': '0 0 0 1px rgba(0,0,0,0.05), 0 1px 6px 0 rgba(0,0,0,.0)',
        'rw-3': '0 0 0 1px rgba(0,0,0,0.05), 0 20px 30px rgba(0,0,0,.2)',
      },
      container: {
        padding: '1rem',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
    },
  },
  plugins: [forms, lineClamp],
};
