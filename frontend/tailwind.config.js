const path = require("path");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  purge: [`${PATHS.src}/**/*`],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fill: (theme) => ({
      red: theme("colors.red.100"),
      green: theme("colors.green.100"),
      blue: theme("colors.blue.100"),
      yellow: theme("colors.yellow.100"),
      gray: theme("colors.gray.100"),
    }),
    stroke: (theme) => ({
      red: theme("colors.red.800"),
      green: theme("colors.green.800"),
      blue: theme("colors.blue.800"),
      yellow: theme("colors.yellow.800"),
      gray: theme("colors.gray.800"),
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
