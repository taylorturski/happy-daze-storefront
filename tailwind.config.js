/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pitch: ['"Pitch Sans"', "sans-serif"],
        vt: ['"VT323"', "monospace"],
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
      },
      fontSize: {
        base: "1.125rem", // 18px instead of 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
      },
    },
  },
  plugins: [],
};
