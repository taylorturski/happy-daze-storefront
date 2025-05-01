/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "builder-layout",
    "fixed",
    "inset-0",
    "z-[99]",
    "z-[100]",
    "flex",
    "flex-col",
    "bg-black",
    "overflow-y-auto",
    "pb-32",
    "border-t-2",
    "border-white",
    "top-3",
    "right-4",
    "text-white",
    "text-3xl",
    "hover:text-[#ACFF9B]",
    "px-3",
    "py-2",
    "px-4",
    "py-3",
    "border-2",
    "bg-[#ACFF9B]",
    "text-black",
    "opacity-30",
    "cursor-not-allowed",
  ],

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
        base: "1.125rem", // 18px
        md: "1.175rem", // 18.8px approx
        lg: "1.25rem", // 20px
        xl: "2rem", // 32px
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
  plugins: [
    require("tailwind-scrollbar")({nocompatible: true}),
    require("@tailwindcss/typography"),
  ],
};
