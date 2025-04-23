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
        md: "1.175rem", // 18px
        lg: "1.25rem", // 20px
        xl: "2rem", // 24px
        xxl: "3rem", // 48px
      },
      keyframes: {
        "blink-green": {
          "0%, 100%": {color: "white"},
          "50%": {color: "#ACFF9B"},
        },
      },
      animation: {
        "blink-green": "blink-green 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({nocompatible: true})],
};
