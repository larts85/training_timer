/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkText: '#262626',
        lightText: '#c9c9c9',
        darkBackground: '#262626',
        lightBackground: '#454545',
        orangeBackground: 'rgba(234, 100, 24, 0.32)',
        darkOrange: '#EA6418',
        lightOrange: '#F2994A',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      fontSize: {
        '10px': '10px',
        '40px': '40px',
        '32px': '32px',
      },
      lineHeight: {
        '14px': '14px',
        '64px': '64px',
        '56px': '56px',
      },
      width: {
        '815px': '815px',
        '175px': '175px',
        '400px': '400px',
      },
      height: {
        '92px': '92px',
        '52px': '52px',
        '89px': '89px',
      },
      boxShadow: {
        'button-active': 'inset 3px 3px 6px rgba(0, 0, 0, 0.25)',
        'button-primary-hover': ' 2px 2px 5px rgba(0, 0, 0, 0.25)',
        'button-hover': '3px 3px 6px rgba(0, 0, 0, 0.25)',
        'button-transparent': 'inset 3px 3px 6px rgba(248, 212, 152, 0.25)',
      },
      borderWidth: {
        '3px': '3px',
        '0.5px': '0.5px',
        '1px': '1px',
      },
    },
  },
  plugins: [],
}
