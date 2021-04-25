// const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#3A1772',
          light: '#4E1F98',
          dark: '#230E44',
        },
        secondary: {
          base: '#28231C',
          light: '#483F32',
          dark: '#181511',
        },
        background: '#FFFCF2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
