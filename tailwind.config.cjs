/** @type {import('tailwindcss').Config} */
const { ComponentsContentPath } = require("@yext/search-ui-react");
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", ComponentsContentPath],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        primary:
          "color-mix(in srgb, var(--theme-primary) calc(100% * <alpha-value>), transparent)",
        secondary:
          "color-mix(in srgb, var(--theme-secondary) calc(100% * <alpha-value>), transparent)",
        tertiary:
          "color-mix(in srgb, var(--theme-tertiary) calc(100% * <alpha-value>), transparent)",
        accent:
          "color-mix(in srgb, var(--theme-accent) calc(100% * <alpha-value>), transparent)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
