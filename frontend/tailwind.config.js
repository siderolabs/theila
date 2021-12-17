const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const colorsTheme = require("./src/vars/colors");

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      roboto: ["Roboto Mono"],
    },
    extend: {
      colors: {
        "talos-gray": colors.trueGray,
        "light-blue": colors.sky,
        ...colorsTheme,
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      textColor: ["active", "disabled"],
      borderColor: ["active", "disabled"],
      cursor: ["disabled"],
      textDecoration: ["active"],
    },
  },
  plugins: [],
};
