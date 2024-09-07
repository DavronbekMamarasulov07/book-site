/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0px 10px 5px  rgba(0, 0, 0, 0.2)",
      },
      scale: {
        "102": "1.02",
      },
    },
  },
  plugins: [],
};
