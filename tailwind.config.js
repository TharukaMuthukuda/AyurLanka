// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"], // 💥 THIS defines 'font-epilogue'
      },
      colors: {
        gangstaGold: "#52540A",
        calmGreen: "#4F9469",
        feelBlue: "#2C3A4B",
      },
    },
  },
  plugins: [],
};
