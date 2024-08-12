import { defineConfig } from "windicss/helpers"
import lineClampPlugin from "windicss/plugin/line-clamp"
import plugin from "windicss/plugin"
import colors from "windicss/colors"

export default defineConfig({
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"]
    },
    boxShadow: {
      ["shadow-1"]: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      ["shadow-2"]: "0px 5px 18px rgba(0, 0, 0, 0.07)"
    },
    colors: {
      transparent: colors.transparent,
      primary: {
        blue: "#404CB3",
        cloud: "#A8ADDD"
      },
      danger: {
        DEFAULT: "#D93030",
        hover: "#EC6262"
      },
      bg: {
        primary: "#243972",
        secondary: "#F1F3F6",
        separator: "#DDDDDD",
        white: "#FFFFFF",
        modal: "#24397280",
        dropdown: "#AEB7FF1A"
      },
      text: {
        DEFAULT: "#3D6670",
        disable: "#94AFB6"
      },
      move: {
        income: "#41BE06",
        spending: "#EB1F39"
      },
      gray: {
        2: "#4F4F4F",
        40: "#9A99A2",
        70: "#232326"
      }
    }
  },
  plugins: [
    lineClampPlugin,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none"
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        }
      })
    })
  ]
})
