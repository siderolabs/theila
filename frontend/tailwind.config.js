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
    },
    extend: {
      colors: {
        "talos-gray": colors.trueGray,
        "light-blue": colors.sky,
        ...colorsTheme,
      },
    },
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
