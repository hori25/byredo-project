/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'container-grid',
    'col-span-1', 'col-span-2', 'col-span-3', 'col-span-4',
    'col-span-5', 'col-span-6', 'col-span-7', 'col-span-8',
    'col-span-9', 'col-span-10', 'col-span-11', 'col-span-12',
    'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4',
    'col-start-5', 'col-start-6', 'col-start-7', 'col-start-8',
    'col-start-9', 'col-start-10', 'col-start-11', 'col-start-12',
    'css-ew64yg',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sk-Modernist', 'sans-serif'],
      },
      colors: {
        foreground: '#0a0a0a',
        background: '#ffffff',
      },
      letterSpacing: {
        DEFAULT: '1.5px',
      },
    },
  },
  plugins: [],
}
