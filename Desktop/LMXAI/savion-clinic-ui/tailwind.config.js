/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#051f20",
        color2: "#126324",
        color3: "#4a8556",
        color4: "#905A32",
        color5: "#CAA078",
        color6: "#D6E9D5",
        color7: "#FEFEFD",
        color8: "#111111",
        color11: "#E0E0E0",
        color22: "#45556C",
        color33: "#0F172B",
        color44: "#020618",
        color55: "#FDFDFD",
        color66: "#303030",
        color77: "#CCCCCC",
        color88: "#EEEEEE",
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(0deg, #f9f9db 0%, #FDFDFD 100%)",
        "gradient-dark": "linear-gradient(0deg, #45556C 0%, #0F172B 100%)",
      },
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
        gothamNarrow: ["GothamNarrow", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
