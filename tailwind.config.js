const colors = require('tailwindcss/colors');

const scaleObject = {};
const scaleNumbers = [...Array(100).keys()].map((item) => item + 1);
scaleNumbers.forEach((item) => (scaleObject[-item] = (-item / 100).toString()));
scaleNumbers.forEach((item) => (scaleObject[item] = (item / 100).toString()));

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    scale: scaleObject,
    extend: {},
    colors: {
      black: colors.black,
      current: 'currentColor',
      dark700: '#292D36',
      dark900: '#22252D',
      gray: colors.trueGray,
      green: colors.green,
      indigo: colors.indigo,
      red: colors.rose,
      transparent: 'transparent',
      white: colors.white,
      yellow: colors.amber,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
