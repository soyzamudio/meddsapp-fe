/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 3px rgba(34, 197, 94, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
          },
        },
      },
      animation: {
        pulse: "pulse 3s ease-in-out infinite",
      },
      fontSize: {
        "2xs": "0.625rem", // 10px
      },
      // font-size: 0.75rem/* 12px */;
      // line-height: 1rem
      colors: {
        "off-white": "#fbfcfd",
      },
    },
  },
  plugins: [],
};
