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
      boxShadow: {
        primaryButton:
          '0px 1px 2px 0px #00000033, 0px 3px 3px 0px #0000002B, 0px 7px 4px 0px #0000001A, 0px 13px 5px 0px #00000008, 0px 21px 6px 0px #00000000',
      },
      backgroundImage: {
        primaryButton: 'linear-gradient(180deg,#5E85FF -37.5%,#456ADD 66.99%,#2E58DB 97.5%)',
        primaryButtonHover:
          'linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(180deg,#5E85FF -37.5%,#456ADD 66.99%,#2E58DB 97.5%)',
      },
    },
  },
  plugins: [],
}
