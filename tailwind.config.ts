import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Moroccan-inspired luxury palette
        terracotta: {
          50: '#fdf8f5',
          100: '#faede5',
          200: '#f5d9c9',
          300: '#eab99f',
          400: '#d99979',
          500: '#c77854',
          600: '#b56340',
          700: '#974f34',
          800: '#7c422d',
          900: '#663928',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f9f5f0',
          200: '#f3ebe0',
          300: '#e6d5c3',
          400: '#d4bfa5',
          500: '#c4a88a',
          600: '#b09572',
          700: '#927a5a',
          800: '#78664d',
          900: '#645544',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfcfa',
          200: '#faf8f5',
          300: '#f5f0e8',
          400: '#ebe3d6',
          500: '#d9d1c2',
          600: '#c4b8a4',
          700: '#a69782',
          800: '#8b7d6b',
          900: '#746859',
        },
        gold: {
          50: '#fdfcfa',
          100: '#faf6f0',
          200: '#f5ebe0',
          300: '#e8d4bf',
          400: '#d4a574',
          500: '#c4915a',
          600: '#b07a42',
          700: '#936038',
          800: '#7a5032',
          900: '#66442b',
        },
        ink: {
          50: '#f7f6f5',
          100: '#e9e7e5',
          200: '#d4d0cd',
          300: '#b5afa9',
          400: '#948c84',
          500: '#786e65',
          600: '#615a53',
          700: '#504a45',
          800: '#443f3b',
          900: '#2a2520',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'zellige': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c77854' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config