module.exports = {
  plugins: [
    require('postcss-nesting'),  // <-- Coloque ANTES do tailwindcss
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
