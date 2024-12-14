/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        times: ["Times New Roman", "serif"],
        arial: ["Arial", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        body: ['"Open Sans"', "sans-serif"],
        Outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
