module.exports = {
  content: ["./src/**/*.tsx", "./public/**/*.html"],
  theme: {
    fontFamily: {
      sans: ['Averta OP', 'sans-serif']
    },

    colors: {
      // standard
      white: '#fff',
      black: '#000',
      transparent: 'transparent',

      // brand
      'bits-blue': '#0572EC',
      'soft-navy': '#16436C',
      'security-black': '#0A2D4D',

      // named, needs formalizing
      // https://colornamer.robertcooper.me/
      'kodama-white': '#e8f3ff',
      'kuretake-black-manga': '#051627',
      'rhapsody-in-blue': '#08243e',
      'sonata-green-minor': '#50b347',
      'clementine': '#eb7100',
      'lily-lavender': '#E6E6E8',
      'grey-frost': '#B9BDC2',
    },
  },
  plugins: [],
}
