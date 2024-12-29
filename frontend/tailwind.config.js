/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primary: "#5C9E9E",
        primaryTint: "#3F91D0",
        primaryTint2: "#0E4A77",
        primaryShadow: "#3C75A6",
        text: "#2A3C3A",
        background: "#F1F5F4",
        secondary: "#F1A7A3",
        secondaryTint: "#F39C12",
      },
      fontFamily: {
        head: ["Raleway"],
      },
      backgroundImage: {
        heroImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('images/hero.jpg')",
        btnBg: "url('images/bg.svg')",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus", "focus-visible"],
      ringWidth: ["focus", "focus-visible"],
    },
  },
  plugins: [],
};
