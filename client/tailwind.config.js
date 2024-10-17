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
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        customLightTheme: {
          "primary": "#5e17ea" ,
          "secondary": "#c1ff72",
          "accent": "#8C52FF" 
        }
      }, "dark"],
  },
}

