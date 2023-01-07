/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        flow: {
          '0%, 100%': { transform: 'rotate(.1deg)'},
          // '50%': { color: 'blue', },

          // from: { color: 'blue' },
          // to: { color: 'yellow' }
          // '0%, 100%': { transform: 'rotate(-3deg)' },
          // '50%': { transform: 'rotate(3deg)' },
        },
        // mode: {
        //   // from: { transform: 'rotate(4deg)', translateY },
        //   // to: { transform: 'rotate(0deg)' },
        //   // '50%': { transform: 'rotate(3deg)' },
        // }
      },
      animation: {
        flow: 'flow 1s ease-in-out infinite',
        // mode: 'mode .3s ease-in'
      }
    },
  },
  plugins: [],
};
