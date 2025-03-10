/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        drukBold: ['Druk-Bold', 'sans-serif'],
        drukBoldItalic: ['Druk-BoldItalic', 'sans-serif'],
        drukHeavy: ['Druk-Heavy', 'sans-serif'],
        drukHeavyItalic: ['Druk-HeavyItalic', 'sans-serif'],
        drukMedium: ['Druk-Medium', 'sans-serif'],
        drukMediumItalic: ['Druk-Medium-Italic', 'sans-serif'],
        drukSuper: ['Druk-Super', 'sans-serif'],
        drukSuperItalic: ['Druk-Super-Italic', 'sans-serif'],
      },
      colors: {
        white: '#fff',
        'off-white': '#dfe4e6',
      },
    },
  },
  plugins: [],
}
