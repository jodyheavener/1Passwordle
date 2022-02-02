module.exports = {
  content: ["./src/**/*.tsx", "./public/**/*.html"],
  theme: {
    fontFamily: {
      sans: ['Averta OP', 'sans-serif']
    },

    colors: {
      // standard
      white: '#fff',

      // brand
      'bits-blue': '#0572EC',
      'soft-navy': '#16436C',
      'security-black': '#0A2D4D',

      // named, needs formalizing
      // https://colornamer.robertcooper.me/
      'kodama-white': '#e8f3ff',
      'kuretake-black-manga': '#051627',
    },
  },
  plugins: [],
}
