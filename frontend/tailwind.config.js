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
        offWhite: '#f0f8ff',
        orange: '#ffa600',
        orangeDark: '#e09302',
        orangeLight: '#d9a13b',
        primary: '#004089',
        background: '#FFFFFF',
        textPrimary: '#333333',
        textSecondary: '#6C757D',
        backdrop: '#000000FF',
        surface: '#F8F9FA',
        surfaceVariant: '#D4D4D4',
        onSurface: '#6C757D',
        onSurfaceVariant: '#404040',
        outline: '#A5A4A4',
        error: '#B91C1C',
        errorBackground: '#FEE2E2',
      },
      boxShadow: {
        primaryButton:
          '0px 1px 2px 0px #00000033, 0px 3px 3px 0px #0000002B, 0px 7px 4px 0px #0000001A, 0px 13px 5px 0px #00000008, 0px 21px 6px 0px #00000000',
      },
      backgroundColor: {
        primaryButton: 'linear-gradient(180deg,#5E85FF -37.5%,#456ADD 66.99%,#2E58DB 97.5%)',
        primaryButtonHover:
          'linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(180deg,#5E85FF -37.5%,#456ADD 66.99%,#2E58DB 97.5%)',
      },
    },
  },
  plugins: [],
}
