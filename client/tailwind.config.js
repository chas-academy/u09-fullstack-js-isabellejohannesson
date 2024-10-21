import daisyui from 'daisyui';

  /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
        heading: ['Pattaya', 'sans-serif']
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        customLightTheme: {
          "primary": "#5e17ea" ,
          "secondary": "#EAE4F7",
          "accent": "#ffe071" 
        }
      }, "dark"],
  },
}

