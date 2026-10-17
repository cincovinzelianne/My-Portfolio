/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18211d",
        paper: "#f7f8f4",
        moss: "#dce9d2",
        lime: "#b9ed70",
        muted: "#6e7973",
        line: "#e4e9e2",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 60px rgba(24, 33, 29, 0.08)",
      },
    },
  },
  plugins: [],
};
