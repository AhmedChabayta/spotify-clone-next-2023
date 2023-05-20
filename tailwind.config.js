/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#238945",
        dark: "#121212",
        highlights: "#212121",
        dimmed: "#a7a7a7",
        lightText: "rgb(203,203,203)",
        menus: "rgb(40,40,40)",
        spotify: "rgb(30,215,97)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
