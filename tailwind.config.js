/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#032212',
        'light-green': '#A9D833',
        'light-green-dark': '#337262',
        'light-gray': '#F3F4F6',
        'my-orange': '#F9A33F',
      },
    },
  },
  plugins: [
    forms,
  ],
}

