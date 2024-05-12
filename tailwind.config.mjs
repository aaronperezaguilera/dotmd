import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#232323',
        secondary: '#282828',
        hover: '#2e2e2e'
      },
      borderColor: {
        primary: '#343434'
      },
      fill: {
        primary: '#232323'
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#a0a0a0',
        prose: '#d1d5db'
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animated')]
}
